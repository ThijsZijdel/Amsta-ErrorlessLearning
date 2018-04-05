<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mennolp, Lucas
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

  } else if ($action === "remove") {

  } else if ($action === "edit") {

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
