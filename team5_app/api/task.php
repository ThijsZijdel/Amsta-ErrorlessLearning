<?php
/**
 * Created by IntelliJ IDEA.
 * User: Menno, Lucas
 * Date: 3/22/2018
 * Time: 2:38 PM
 */

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

    $taskId = $obj->Task->id;
    $taskName = $obj->Task->name;
    $taskDescription = $obj->Task->mainDescription;
    $taskImageLink = $obj->Task->imgLink;
    $taskSteps = $obj->Task->steps;

    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));
    $success = true;

    if ($conn->connect_error) {
      $response['status'] = array(
        'success' => false,
        'message' => 'Database connection error',
      );
    } else {
      $sql = "INSERT INTO amsta.Task(name, description, imgLink, idTask) VALUES($taskName, $taskDescription, $taskImageLink, $taskId)" ;
      //Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $response['status'] = array(
          'success' => true,
          'message' => 'Only the task has successfully been updated.',
          'dev_message' => 'Zorg er dus voor dat dit ook een duidelijke melding word in de applicatie'
        );

        foreach($taskSteps as $step)
        {
          $stepId = $step->id;
          $stepDescription = $step->stepDescription;
          $stepImageLink = $step->stepImgLink;

          $sql = "INSERT INTO  amsta.Step(imgLink, description, Task_taskId) VALUES($stepImageLink, $stepDescription, $taskId)";

          if (!$conn->query($sql) === TRUE) {
            $success = false;
          }
        }
      } else {
        $response['status'] = array(
          'message' => 'Error something went wrong while trying to add the task',
          'success' => false,
          'errorMessage' => $conn->error
        );
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
        $response['status'] = array(
          'message' => 'Database connection error',
        );
      } else {
        // sql to delete a record
        $sql = "DELETE FROM amsta.Task WHERE id=" + $id;

        // Connection with success and error messages.
        if ($conn->query($sql) === TRUE) {
          $response['status'] = array(
            'success' => true,
            'message' => 'Successfully removed task',
            'taskId' => $id
          );
        } else {
          $response['status'] = array(
            'success' => false,
            'message' => 'Error something went wrong while trying to delete task',
          );
        }
      }
    }
  } else if ($action === "edit") {
    $json = file_get_contents('php://input');
    $obj = json_decode($json);

    $taskId = $obj->Task->id;
    $taskName = $obj->Task->name;
    $taskDescription = $obj->Task->mainDescription;
    $taskImageLink = $obj->Task->imgLink;
    $taskSteps = $obj->Task->steps;

    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));
    $success = true;

    if ($conn->connect_error) {
      $response['status'] = array(
        'success' => false,
        'message' => 'Database connection error',
      );
    } else {
      $sql = "UPDATE amsta.Task SET amsta.Task.name='" . $taskName . "',amsta.Task.description='" . $taskDescription . "',amsta.Task.imgLink='" . $taskImageLink . "' WHERE amsta.Task.idTask=" . $taskId;
      // Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $response['status'] = array(
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
      } else {
        $response['status'] = array(
          'message' => 'Error something went wrong while trying to update task',
          'success' => false,
          'errorMessage' => $conn->error
        );
      }

      if($success)
      {
        $response['status'] = array(
          'message' => 'Task and steps successfully updated!',
          'success' => true
        );
      } else {
        $response['status'] = array(
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
        $response['status'] = array(
          'message' => 'Database connection error',
        );
      }
      else
      {
        $sql = "SELECT amsta.Task.name AS taskName,amsta.Task.description AS taskDescription, amsta.Task.imgLink as taskImageLink,amsta.Step.* FROM
          amsta.Task INNER JOIN
          amsta.Step ON
          amsta.Task.idTask=
          amsta.Step.Task_taskId where
          amsta.Task.idTask=" . $id;


        // Query database
        $result = $conn->query($sql);

        // Loop through data of database
        if ($result->num_rows > 0)
        {

          $steps = array();

          // output data of each row
          while ($row = $result->fetch_assoc()) {

            // SQL OUTPUT FORMAT
            // taskname, taskdesc, taskimglink,stepid,imglink,description,taskid

            // Fill Task
            $taskName = $row["taskName"];
            $taskDescription = $row["taskDescription"];
            $taskImageLink = $row["taskImageLink"];

            // Fill task with steps
            $step = array(
              'stepImgLink' => $row['imgLink'],
              'stepDescription' => $row['description']
            );
            array_push($steps,$step);
          }
          $response['Task'] = array(
            'name' => $taskName,
            'imgLink' => $taskImageLink,
            'mainDescription' => $taskDescription,
            'steps' => $steps
          );
        }

        // Close connection
        $conn->close();
      }
    }
  }
}
else {
  $response['status'] = array(
    'message' => 'No action found',
  );
}

$encoded = json_encode($response);
header('Content-type: application/json');
exit($encoded);
