<?php
/**
 * Created by IntelliJ IDEA.
 * User: Menno, Lucas
 * Date: 3/22/2018
 * Time: 2:38 PM
 */

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

define("SERVER_NAME", "localhost");
define("DATABASE_NAME", "team5_app");
define("USERNAME", "team5");
define("PASSWORD", "78pESGC7k8rEMq4K");

$response[] = array(
  'message' => 'Something went terribly wrong',
);

/** Checking if action exists **/
if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];

  if ($action === "add") {
    $json = file_get_contents('php://input');
    $obj = json_decode($json);

    $taskName = $obj->name;
    $taskDescription = $obj->mainDescription;
    $taskImageLink = $obj->imgLink;
    $taskSteps = $obj->steps;
    $taskTimes = $obj->taskTimes;

    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));
    $success = true;

    if ($conn->connect_error) {
      $success = false;
    } else {
      $sql = "INSERT INTO team5_app.Task(name, Description, imgLink) VALUES('" . $taskName . "', '" . $taskDescription . "', '" . $taskImageLink . "')";
      //Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $errorcode = '';
        $taskId = $conn->insert_id;
        $response['status'] = array(
          'success' => true,
          'message' => 'Only the task has successfully been added.',
          'dev_message' => 'Zorg er dus voor dat dit ook een duidelijke melding word in de applicatie'
        );

        foreach ($taskSteps as $step) {
          $stepDescription = $step->stepDescription;
          $stepImageLink = $step->stepImgLink;

          $timerId = -1;

          if ($step->timer && !is_null($step->timer)) {
            $timerTime = $step->timer->time;

            $sql = "INSERT INTO  team5_app.Timer(time) VALUES('" . $timerTime . "')";

            if (!$conn->query($sql) === TRUE) {
              $errorcode = "TIMER_INSERT";
              $success = false;
            } else {
              $timerId = $conn->insert_id;
            }
          }

          $sql = ($step->timer && !is_null($step->timer)) ? "INSERT INTO  team5_app.Step(imgLink, description, Task_taskId) VALUES('" . $stepImageLink . "', '" . $stepDescription . "', '" . $taskId . "')" : "INSERT INTO  team5_app.Step(imgLink, description, Task_taskId,Timer_timerId) VALUES('" . $stepImageLink . "', '" . $stepDescription . "', '" . $taskId . "', '" . $timerId . "')";

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = "STEP_INSERT";
          }
        }
        $taskTimeId = 0;
        foreach ($taskTimes as $taskTime) {
          $taskTimeId++;
          $taskStartTime = $taskTime->startTime;
          $taskEndTime = $taskTime->endTime;

          $sql = "INSERT INTO  team5_app.TaskTime(id,startTime, endTime, Task_taskId) VALUES(". $taskTimeId . ",'" . $taskStartTime . "', '" . $taskEndTime . "', '" . $taskId . "')";

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = "TASKTIMES_INSERT";
          }
        }
      } else {
        $errorcode = "TASK_INSERT";
        $success = false;
      }

      if ($success) {
        $response['status'] = array(
          'message' => 'Task and steps successfully added!',
          'success' => true
        );
      } else {
        $response['status'] = array(
          'message' => 'Error something went wrong while trying to add the task',
          'success' => false,
          'errorCode' => $errorcode,
          'errorMessage' => $conn->error
        );
      }
    }
  } else if ($action === "remove") {
    if (isset($_REQUEST["id"])) {
      $id = $_REQUEST["id"];

      // Create connection
      $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"), constant("DATABASE_NAME"));

      if ($conn->connect_error) {
        $response = array(
          'message' => 'Database connection error',
        );
      } else {
        // sql to delete a record
        $sql = "DELETE FROM team5_app.Task WHERE team5_app.Task.idTask=" . $id;

        // Connection with success and error messages.
        if ($conn->query($sql) === TRUE) {
          $response = array(
            'success' => true,
            'message' => 'Successfully removed task',
            'taskId' => $id
          );
        } else {
          $response = array(
            'success' => false,
            'message' => 'Error something went wrong while trying to delete task',
            'errorMessage' => $conn->error
          );
        }
      }
    }
  } else if ($action === "edit") {
    $json = file_get_contents('php://input');
    $obj = json_decode($json);

    $taskId = $obj->id;
    $taskName = $obj->name;
    $taskDescription = $obj->mainDescription;
    $taskImageLink = $obj->imgLink;
    $taskSteps = $obj->steps;
    $taskTimes = $obj->taskTimes;

    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));
    $success = true;
    $errorcode = '';
    $errorMessage = '';

    if ($conn->connect_error) {
      $errorcode = "DATABASE_ERROR";
      $errorMessage = $conn->error;
    } else {
      $sql = "UPDATE team5_app.Task SET team5_app.Task.name='" . $taskName . "',team5_app.Task.description='" . $taskDescription . "',team5_app.Task.imgLink='" . $taskImageLink . "' WHERE team5_app.Task.idTask=" . $taskId;
      // Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $response = array(
          'success' => true,
          'message' => 'Only the task has successfully been updated.',
        );

        ///////////////ADD OR REMOVE EXISTING STEPS////////////////
        $sql = "SELECT COUNT(team5_app.Step.idStep) AS steps FROM team5_app.Step WHERE team5_app.Step.Task_idTask=" . $taskId;

        // Query database
        $result = $conn->query($sql);
        $stepAmount = 0;

        // Loop through data of database
        if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $stepAmount = intval($row['steps']);
        }

        // Stepamount is current amount of steps inside database
        // count($taskSteps) is current amount of steps inside task retrieved from application.
        if ($stepAmount < count($taskSteps)) // There is a/are step(s) added
        {
          $amountStepsAdded = count($taskSteps) - $stepAmount;

          for ($i = 0; $i < $amountStepsAdded; $i++) {
            $newStepId = $stepAmount + 1 + $i;
            $sql = "INSERT INTO  team5_app.Step(idStep,imgLink, description, Task_idTask) VALUES(" . $newStepId . " ,'null','null'," . $taskId . ")";
            if (!$conn->query($sql) === TRUE) {
              $success = false;
              $errorcode = 'INSERT_STEP';
              $errorMessage = $conn->error;
            }
          }
        } else if ($stepAmount > count($taskSteps)) // There is a/are step(s) removed
        {
          $amountStepsRemoved = $stepAmount - count($taskSteps);
          $startRemoveIndex = $stepAmount - $amountStepsRemoved;

          $sql = "DELETE FROM team5_app.Step WHERE team5_app.Step.idStep > " . $startRemoveIndex . " AND team5_app.Step.Task_idTask=" . $taskId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = 'DELETE_STEP';
            $errorMessage = $conn->error;
          }
        }
        ///////////////END ADD OR REMOVE EXISTING STEPS////////////////

        ///////////////ADD OR REMOVE EXISTING TASKTIMES////////////////
        $sql = "SELECT COUNT(team5_app.TaskTime.id) AS taskTimes FROM team5_app.TaskTime WHERE team5_app.TaskTime.Task_taskId=" . $taskId;

        // Query database
        $result = $conn->query($sql);
        $timesAmount = 0;

        // Loop through data of database
        if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $timesAmount = intval($row['taskTimes']);
        }

        if ($timesAmount < count($taskTimes)) // There is a/are step(s) added
        {
          $amountTimesAdded = count($taskTimes) - $timesAmount;

          for ($i = 0; $i < $amountTimesAdded; $i++) {
            $newTaskTimeId = $timesAmount + 1 + $i;
            $sql = "INSERT INTO  team5_app.TaskTime(id,startTime, endTime, Task_taskId) VALUES(" . $newTaskTimeId . ",'null','null'," . $taskId . ")";
            if (!$conn->query($sql) === TRUE) {
              $success = false;
              $errorcode = 'INSERT_TASKTIME';
              $errorMessage = $conn->error;
            }
          }
        } else if ($timesAmount > count($taskTimes)) // There is a/are step(s) removed
        {
          $amountTimesRemoved = $timesAmount - count($taskTimes);
          $startRemoveIndex = $timesAmount - $amountTimesRemoved;

          $sql = "DELETE FROM team5_app.TaskTime WHERE team5_app.TaskTime.id > " . $startRemoveIndex . " AND team5_app.TaskTime.Task_taskId=" . $taskId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = 'DELETE_TASKTIME';
            $errorMessage = $conn->error;
          }
        }
        ///////////////END ADD OR REMOVE EXISTING TASKTIMES////////////////
        foreach ($taskSteps as $step) {
          $stepId = $step->id;
          $stepDescription = $step->stepDescription;
          $stepImageLink = $step->stepImgLink;

          if (!is_null($step->timer)) {
            $sql = is_null($step->timer->id) ? "INSERT INTO team5_app.Timer(time) VALUES(" . $step->timer->time . ")" : "UPDATE team5_app.Timer SET team5_app.Timer.time='" . $step->timer->time . "'WHERE team5_app.Timer.id=" . $step->timer->id;

            if (!$conn->query($sql) === TRUE) {
              $success = false;
              $errorcode = 'UPDATE_STEPTIMER';
              $errorMessage = $conn->error;
            }
          }

          $sql = !is_null($step->timer) ? "UPDATE team5_app.Step SET team5_app.Step.description='" . $stepDescription . "',team5_app.Step.imgLink='" . $stepImageLink . "', team5_app.Step.Timer_idTimer='" . $step->timer->id . "' WHERE team5_app.Step.Task_idTask=" . $taskId . " AND team5_app.Step.idStep=" . $stepId : "UPDATE team5_app.Step SET team5_app.Step.description='" . $stepDescription . "',team5_app.Step.imgLink='" . $stepImageLink . "' WHERE team5_app.Step.Task_idTask=" . $taskId . " AND team5_app.Step.idStep=" . $stepId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = 'UPDATE_STEPS';
            $errorMessage = $conn->error;
          }
        }

        foreach ($taskTimes as $taskTime) {
          $taskStartTime = $taskTime->startTime;
          $taskEndTime = $taskTime->endTime;
          $taskTimeId = $taskTime->id;

          $sql = "UPDATE team5_app.TaskTime SET team5_app.TaskTime.startTime='" . $taskStartTime . "', team5_app.TaskTime.endTime='" . $taskEndTime . "' WHERE team5_app.TaskTime.Task_taskId=" . $taskId . " AND team5_app.TaskTime.id=" . $taskTimeId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = 'UPDATE_TASKTIME';
            $errorMessage = $conn->error;
          }
        }
      }

      if ($success) {
        $response = array(
          'message' => 'Task and steps successfully updated!',
          'success' => true,
          'error_code' => $conn->error,
          'second_error_code' => $errorcode
        );
      } else {
        $response = array(
          'message' => 'Error something went wrong while trying to update task',
          'success' => false,
          'errorMessage' => $errorMessage,
          'error_code' => $errorcode
        );
      }
    }
  } else if ($action === "get") {
    if (isset($_REQUEST["id"])) {
      $id = $_REQUEST["id"];

      // Create connection
      $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));

      if ($conn->connect_error) {
        $response = array(
          'message' => 'Database connection error',
        );
      } else {
        $sql = "SELECT team5_app.Task.name AS taskName,team5_app.Task.description AS taskDescription, team5_app.Task.imgLink as taskImageLink FROM
          team5_app.Task WHERE team5_app.Task.idTask=" . $id;

        // Query database
        $result = $conn->query($sql);

        // Loop through data of database
        if ($result->num_rows > 0) {
          $steps = array();
          $taskTimes = array();

          // output data of each row
          $row = $result->fetch_assoc();

          // Fill Task
          $taskName = $row["taskName"];
          $taskDescription = $row["taskDescription"];
          $taskImageLink = $row["taskImageLink"];

          $sql = "SELECT * FROM team5_app.Step 
                  INNER JOIN team5_app.Timer WHERE team5_app.Step.Task_idTask=" . $id;

          // Query database
          $result = $conn->query($sql);

          // Loop through data of database
          if ($result->num_rows > 0) { // output data of each row
            while ($row = $result->fetch_assoc()) {
              $timer = null;
              if(!is_null($row['Timer_idTimer']))
              {
                $timer = array(
                  'id' => $row['Timer_idTimer'],
                  'time' => $row['time']
                );
              }
              // Fill task with steps
              $step = array(
                'id' => $row['idStep'],
                'stepImgLink' => $row['imgLink'],
                'stepDescription' => $row['description'],
                'timer' => $timer
              );
              array_push($steps, $step);
            }
          }

          $sql = "SELECT team5_app.TaskTime.* FROM
          team5_app.TaskTime WHERE team5_app.TaskTime.Task_taskId=" . $id;

          // Query database
          $result = $conn->query($sql);

          // Loop through data of database
          if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
              // Fill task with steps
              $taskTime = array(
                'id' => $row['id'],
                'startTime' => $row['startTime'],
                'endTime' => $row['endTime']
              );
              array_push($taskTimes, $taskTime);
            }

          }
          $response = array(
            'id' => $id,
            'name' => $taskName,
            'imgLink' => $taskImageLink,
            'mainDescription' => $taskDescription,
            'steps' => $steps,
            'taskTimes' => $taskTimes
          );

          //Close connection for TaskTimes query
          $conn->close();
        }
      }
    }
  } else if ($action === "getAll") {
    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));

    if ($conn->connect_error) {
      $response = array(
        'message' => 'Database connection error',
      );
    } else {
      $response = array();
      $sql = "SELECT team5_app.Task.idTask as taskId,team5_app.Task.name AS taskName,team5_app.Task.description AS taskDescription, team5_app.Task.imgLink as taskImageLink FROM
                team5_app.Task";
      // Query database
      $result = $conn->query($sql);

      // Loop through data of database
      if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
          $steps = array();
          $taskTimes = array();

          $taskName = $row["taskName"];
          $taskDescription = $row["taskDescription"];
          $taskImageLink = $row["taskImageLink"];
          $id = $row["taskId"];

          $sql = "SELECT * FROM team5_app.Step 
                  INNER JOIN team5_app.Timer WHERE team5_app.Step.Task_idTask=" . $id;

          // Query database
          $secondResult = $conn->query($sql);

          // Loop through data of database
          if ($secondResult->num_rows > 0) { // output data of each row
            while ($secondRow = $secondResult->fetch_assoc()) {
              $timer = null;
              if(!is_null($secondRow['Timer_idTimer']))
              {
                $timer = array(
                  'id' => $secondRow['Timer_idTimer'],
                  'time' => $secondRow['time']
                );
              }
              // Fill task with steps
              $step = array(
                'id' => $secondRow['idStep'],
                'stepImgLink' => $secondRow['imgLink'],
                'stepDescription' => $secondRow['description'],
                'timer' => $timer
              );
              array_push($steps, $step);
            }
          }

          $sql = "SELECT team5_app.TaskTime.* FROM team5_app.TaskTime WHERE team5_app.TaskTime.Task_taskId=" . $id;

          // Query database
          $thirdResult = $conn->query($sql);
          // Loop through data of database
          if ($thirdResult->num_rows > 0) {
            // output data of each row
            while ($thirdRow = $thirdResult->fetch_assoc()) {
              // Fill task with steps
              $taskTime = array(
                'id' => $thirdRow['id'],
                'startTime' => $thirdRow['startTime'],
                'endTime' => $thirdRow['endTime']
              );
              array_push($taskTimes, $taskTime);
            }
          }

          $task = array(
            'id' => $id,
            'name' => $taskName,
            'imgLink' => $taskImageLink,
            'mainDescription' => $taskDescription,
            'steps' => $steps,
            'taskTimes' => $taskTimes
          );

          array_push($response, $task);
        }

        // Close connection
        $conn->close();
      }
    }
  } else if ($action === "uploadImage") {
    $target_dir = "/srv/www/team5/public/assets/images/tasks/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
      $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
      if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
      } else {
        echo "File is not an image.";
        $uploadOk = 0;
      }
    }
// Check if file already exists
    if (file_exists($target_file)) {
      //echo "File already exists, overwriting";
    }

// Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
      && $imageFileType != "gif") {
      echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
      $uploadOk = 0;
    }
// Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
    } else {
      if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        $response = array(
          'success' => true,
          'message' => 'Successfully uploaded image',
        );
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
    }
  }
}
else {
  $response = array(
    'success' => false,
    'message' => 'No action found',
  );
}

$encoded = "";
$encoded = json_encode($response);
header('Content-type: application/json');
exit($encoded);
