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
define("DATABASE_NAME", "amsta");
define("USERNAME", "root");
define("PASSWORD", "");

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
      $sql = "INSERT INTO amsta.Task(name, Description, imgLink) VALUES('" . $taskName . "', '" . $taskDescription . "', '" . $taskImageLink . "')";
      //Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $taskId = $conn->insert_id;
        $response['status'] = array(
          'success' => true,
          'message' => 'Only the task has successfully been added.',
          'dev_message' => 'Zorg er dus voor dat dit ook een duidelijke melding word in de applicatie'
        );

        foreach($taskSteps as $step)
        {
          $stepDescription = $step->stepDescription;
          $stepImageLink = $step->stepImgLink;


          $sql = "INSERT INTO  amsta.Step(imgLink, description, Task_taskId) VALUES('" . $stepImageLink . "', '" . $stepDescription . "', '" . $taskId . "')";

          if (!$conn->query($sql) === TRUE) {
            $success = false;
          }
        }
        foreach($taskTimes as $taskTime)
        {
          $taskStartTime = $taskTime->startTime;
          $taskEndTime = $taskTime->endTime;

          $sql = "INSERT INTO  amsta.TaskTime(startTime, endTime, Task_taskId) VALUES('" . $taskStartTime . "', '" . $taskEndTime . "', '" . $taskId . "')";

          if (!$conn->query($sql) === TRUE) {
            $success = false;
          }
        }
      } else {
        $success = false;
      }

      if($success)
      {
        $response['status'] = array(
          'message' => 'Task and steps successfully added!',
          'success' => true
        );
      } else {
        $response['status'] = array(
          'message' => 'Error something went wrong while trying to add the task',
          'success' => false,
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
        $sql = "DELETE FROM amsta.Task WHERE id=" + $id;

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

    if ($conn->connect_error) {
      $response = array(
        'success' => false,
        'message' => 'Database connection error',
      );
    } else {
      $sql = "UPDATE amsta.Task SET amsta.Task.name='" . $taskName . "',amsta.Task.description='" . $taskDescription . "',amsta.Task.imgLink='" . $taskImageLink . "' WHERE amsta.Task.idTask=" . $taskId;
      // Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $response = array(
          'success' => true,
          'message' => 'Only the task has successfully been updated.',
          'dev_message' => 'Zorg er dus voor dat dit ook een duidelijke melding word in de applicatie'
        );

        foreach($taskSteps as $step)
        {
          $stepId = $step->id;
          $stepDescription = $step->stepDescription;
          $stepImageLink = $step->stepImgLink;

          $sql = "UPDATE amsta.Step SET amsta.Step.description='" . $stepDescription . "',amsta.Step.imgLink='" . $stepImageLink . "' WHERE amsta.Step.Task_taskId=" . $taskId . " AND amsta.Step.idStep=" . $stepId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
          }
        }

        foreach($taskTimes as $taskTime)
        {
          $taskStartTime = $taskTime->startTime;
          $taskEndTime = $taskTime->endTime;
          $taskTimeId = $taskTime->id;

          $sql = "UPDATE amsta.TaskTime SET amsta.TaskTime.startTime='" . $taskStartTime . "', amsta.TaskTime.endTime='" . $taskEndTime . "' WHERE amsta.TaskTime.Task_taskId=" . $taskId . " AND amsta.TaskTime.id=" . $taskTimeId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
          }
        }
      } else {
        $response = array(
          'message' => 'Error something went wrong while trying to update task',
          'success' => false,
          'errorMessage' => $conn->error
        );
      }

      if($success)
      {
        $response = array(
          'message' => 'Task and steps successfully updated!',
          'success' => true
        );
      } else {
        $response = array(
          'message' => 'Error something went wrong while trying to update task',
          'success' => false,
          'errorMessage' => $conn->error
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
      }
      else
      {
        $sql = "SELECT amsta.Task.name AS taskName,amsta.Task.description AS taskDescription, amsta.Task.imgLink as taskImageLink FROM
          amsta.Task WHERE amsta.Task.idTask=" . $id;

        // Query database
        $result = $conn->query($sql);

        // Loop through data of database
        if ($result->num_rows > 0)
        {
          $steps = array();
          $taskTimes = array();

          // output data of each row
          $row = $result->fetch_assoc();

          // Fill Task
          $taskName = $row["taskName"];
          $taskDescription = $row["taskDescription"];
          $taskImageLink = $row["taskImageLink"];

          $sql = "SELECT amsta.Step.description, amsta.Step.imgLink FROM
          amsta.Step WHERE amsta.Step.Task_idTask=" . $id;

          // Query database
          $result = $conn->query($sql);

          // Loop through data of database
          if ($result->num_rows > 0)
          { // output data of each row
            while ($row = $result->fetch_assoc()) {
              // Fill task with steps
              $step = array(
                'stepImgLink' => $row['imgLink'],
                'stepDescription' => $row['description']
              );
              array_push($steps,$step);
            }
          }

          $sql = "SELECT amsta.TaskTime.startTime, amsta.Step.endTime FROM
          amsta.TaskTime WHERE amsta.TaskTime.Task_idTask=" . $id;

          // Query database
          $result = $conn->query($sql);

          // Loop through data of database
          if ($result->num_rows > 0)
          {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
              // Fill task with steps
              $taskTime = array(
                'startTime' => $row['startTime'],
                'endTime' => $row['endTime']
              );
              array_push($taskTimes,$taskTime);
            }

          }
          $response = array(
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
  } else if($action === "getAll") {
    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));

    if ($conn->connect_error) {
      $response = array(
        'message' => 'Database connection error',
      );
    }
    else
    {
        $tasks = array();
        $sql = "SELECT amsta.Task.idTask as taskId,amsta.Task.name AS taskName,amsta.Task.description AS taskDescription, amsta.Task.imgLink as taskImageLink FROM
                amsta.Task";
      // Query database
      $result = $conn->query($sql);

      // Loop through data of database
      if ($result->num_rows > 0)
      {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
          $steps = array();
          $taskTimes = array();

          $taskName = $row["taskName"];
          $taskDescription = $row["taskDescription"];
          $taskImageLink = $row["taskImageLink"];
          $id = $row["taskId"];

          $sql = "SELECT amsta.Step.description, amsta.Step.imgLink FROM
          amsta.Step WHERE amsta.Step.Task_idTask=" . $id;

          // Query database
          $secundairResult = $conn->query($sql);

          // Loop through data of database
          if ($secundairResult->num_rows > 0)
          { // output data of each row
            while ($row = $secundairResult->fetch_assoc()) {
              // Fill task with steps
              $step = array(
                'stepImgLink' => $row['imgLink'],
                'stepDescription' => $row['description']
              );
              array_push($steps,$step);
            }
          }

          $sql = "SELECT amsta.TaskTime.startTime, amsta.Step.endTime FROM
          amsta.TaskTime WHERE amsta.TaskTime.Task_idTask=" . $id;

          // Query database
          $secundairResult = $conn->query($sql);

          // Loop through data of database
          if ($secundairResult->num_rows > 0)
          {
            // output data of each row
            while ($row = $secundairResult->fetch_assoc()) {
              // Fill task with steps
              $taskTime = array(
                'startTime' => $row['startTime'],
                'endTime' => $row['endTime']
              );
              array_push($taskTimes,$taskTime);
            }
          }

          $task = array(
            'name' => $taskName,
            'imgLink' => $taskImageLink,
            'mainDescription' => $taskDescription,
            'steps' => $steps,
            'taskTimes' => $taskTimes
          );

          array_push($tasks, $task);
        }
        $response = $tasks;

        // Close connection
        $conn->close();
      }
    }
  }
}
else {
  $response[] = array(
    'message' => 'No action found',
  );
}

$encoded = json_encode($response);
header('Content-type: application/json');
exit($encoded);
