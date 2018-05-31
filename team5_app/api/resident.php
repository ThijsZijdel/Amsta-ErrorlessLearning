<?php
/**
 * User: Menno, Lucas
 * Date: 5/29/2018
 * Time: 1:12 PM
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

    $resId = $obj->id;
    $resName = $obj->name;
    $resSurname = $obj->surname;
    $resBio = $obj->bio;
    $resImgPath = $obj->$imgPath;
    $activities = $obj->Activity;

    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));
    $success = true;

    if ($conn->connect_error) {
      $success = false;
    } else {
        $sql = "INSERT INTO team5_app.Resident(name, surname, bio, imgPath) 
        VALUES('" . $resName . "', '" . $resSurname . "', '" . $resBio . "', '" . $resImgPath . "')";
        
       //Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $taskId = $conn->insert_id;
        $response['status'] = array(
          'success' => true,
          'message' => 'Only the task has successfully been added.',
          'dev_message' => 'Zorg er dus voor dat dit ook een duidelijke melding word in de applicatie'
        );

        foreach($activities as $Activity)
        {
            $actName = $Activity->activityName;
            $actDate = $Activity->activityDate;
            $actStart = $Activity->timeStart;
            $actEnd = $Activity->timeEnd;
            $actStartedTime = $Activity->timeStarted;
            $actEndedTime = $Activity->timeEnded;
            $actCompletedTime = $Activity->completedTime;
            $actCompleted = $Activity->completed;
            $actNotes = $Activity->notes;

            $sql = "INSERT INTO  team5_app.Activity(name, date, timeStart, timeEnd, timeStarted, timeEnded, completedTime, completed, notes, Resident_resId, Task_idTask) 
            VALUES(" . $actName . ", " . $actDate . ", " . $actStart . ", " . $actEnd . ", " . $actStartedTime . ", " . $actEndedTime . ", " . $actCompletedTime . ", " . $actCompleted . ", " . $actNotes . ", " . $resId . ", " . $taskId . ")";

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
          'message' => 'activities and resident successfully added!',
          'success' => true
        );
      } else {
        $response['status'] = array(
          'message' => 'Error something went wrong while trying to add the resident',
          'success' => false,
          'errorMessage' => $conn->error
        );
      }
    }
  }else if ($action === "remove") {
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
        $sql = "DELETE FROM team5_app.Resident WHERE id=" + $id;

        // Connection with success and error messages.
        if ($conn->query($sql) === TRUE) {
          $response = array(
            'success' => true,
            'message' => 'Successfully removed Resident',
            'residentId' => $id
          );
        } else {
          $response = array(
            'success' => false,
            'message' => 'Error something went wrong while trying to delete resident',
          );
        }
      }
    }
  } else if ($action === "edit") {
    $json = file_get_contents('php://input');
    $obj = json_decode($json);

    $resId = $obj->id;
    $resName = $obj->name;
    $resSurname = $obj->surname;
    $resBio = $obj->bio;
    $resImgPath = $obj->$imgPath;
    $activities = $obj->Activity;

    // Create connection
    $conn = new mysqli(constant("SERVER_NAME"), constant("USERNAME"), constant("PASSWORD"));
    $success = true;
    $errorcode = '';
    $errorMessage = '';

    if ($conn->connect_error) {
      $errorcode = "DATABASE_ERROR";
      $errorMessage = $conn->error;
    } else {
      $sql = "UPDATE team5_app.Resident 
      SET team5_app.Resident.name='" . $resName . "', team5_app.Resident.surname='" . $resSurname . "',team5_app.Resident.Bio='" . $resBio . "',team5_app.Resident.imgPath='" . $resImgPath . "' WHERE team5_app.Resident.idRes=" . $resId;
      // Connection with success and error messages.
      if ($conn->query($sql) === TRUE) {
        $response = array(
          'success' => true,
          'message' => 'Only the resident has successfully been updated.',
        );

        ///////////////ADD OR REMOVE EXISTING ACTIVITY-LOGS////////////////
        $sql = "SELECT COUNT(team5_app.Activity.idActivity) 
        AS activities 
        FROM team5_app.Activity 
        WHERE team5_app.Activity.Resident_idRes=" . $resId;

        // Query database
        $result = $conn->query($sql);
        $actAmount = 0;

        // Loop through data of database
        if ($result->num_rows > 0)
        {
          $row = $result->fetch_assoc();
          $actAmount = intval($row['activity']);
        }

        // actAmount is current amount of activities inside database
        // count($activities) is current amount of activitylogs inside resident retrieved from application.
        if($actAmount < count($activities))
        {
          $activitiesAdded = count($activities) - $actAmount;

          for ($i = 0; $i < $activitiesAdded; $i++) {
            $newActId = $activities + 1 + $i;
            $sql = "INSERT INTO  team5_app.Activity(id, name, date, timeStart, timeEnd, timeStarted, timeEnded, completedTime, completed, notes, Resident_resId, Task_idTask) 
                    VALUES(" . $newActId . ", " . $actName . ", " . $actDate . ", " . $actStart . ", " . $actEnd . ", " . $actStartedTime . ", " . $actEndedTime . ", " . $actCompletedTime . ", " . $actCompleted . ", " . $actNotes . ", " . $resId . ", " . $taskId . ")";
            if (!$conn->query($sql) === TRUE) {
              $success = false;
              $errorcode = 'INSERT_ACTIVITY';
              $errorMessage = $conn->error;
            }
          }
        }
        else if($actAmount > count($activities)) // There is an/are activity(ies) removed
        {
          $actRemoved = $actAmount - count($activities);
          $startRemoveIndex = $actAmount - $actRemoved;

          $sql = "DELETE FROM team5_app.Activity
                  WHERE team5_app.Activity.idActivity > " . $startRemoveIndex . " 
                  AND team5_app.Activity.Resident_resId=" . $resId;

          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = 'DELETE_ACTIVITY';
            $errorMessage = $conn->error;
          }
        }
        ///////////////END ADD OR REMOVE EXISTING ACTIVITIES////////////////

        foreach ($activities as $Activity) {
            $idActivity = $Activity->id;
            $actName = $Activity->activityName;
            $actDate = $Activity->activityDate;
            $actStart = $Activity->timeStart;
            $actEnd = $Activity->timeEnd;
            $actStartedTime = $Activity->timeStarted;
            $actEndedTime = $Activity->timeEnded;
            $actCompletedTime = $Activity->completedTime;
            $actCompleted = $Activity->completed;
            $actNotes = $Activity->notes;

          $sql = "SELECT COUNT(team5_app.Activity.id) 
                  AS Activities  
                  FROM team5_app.Activity 
                  WHERE team5_app.Activity.Resident_resId=" . resId;
          if (!$conn->query($sql) === TRUE) {
            $success = false;
            $errorcode = 'UPDATE_ACTIVITY';
            $errorMessage = $conn->error;
          }
        }
      }

      if($success)
      {
        $response = array(
          'message' => 'Resident and his/her activies succesfully updated!',
          'success' => true
        );
      } else {
        $response = array(
          'message' => 'Error something went wrong while trying to update resident/activies',
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
      }
      else
      {
        $sql = "SELECT team5_app.Resident.name AS resName,team5_app.Resident.surname AS resSurname, team5_app.Resident.bio AS resBio, team5_app.Resident.imgPath AS resImgPath
                FROM team5_app.Resident 
                WHERE team5_app.Resident.resId=" . $id;

        // Query database
        $result = $conn->query($sql);

        // Loop through data of database
        if ($result->num_rows > 0)
        {
          $activities = array();

          // output data of each row
          $row = $result->fetch_assoc();

          // Fill Resident
          $resName = $row["resName"];
          $resSurname = $row["resSurname"];
          $resBio = $row["resBio"];
          $resImgPath = $row["resImgPath"];


          $sql = "SELECT team5_app.Activity.* 
          FROM team5_app.Activity 
          WHERE team5_app.Activity.Resident_resId=" . $id;

          // Query database
          $result = $conn->query($sql);

          // Loop through data of database
          if ($result->num_rows > 0)
          { // output data of each row
            while ($row = $result->fetch_assoc()) {
              // Fill res with activities
              $Activity = array(
                'id' => $row['idActivity'],
                'name' => $row['name'],
                'date' => $row['date'],
                'startTime' => $row['timeStart'],
                'endTime' => $row['timeEnd'],
                'timeStarted' => $row['timeStarted'],
                'timeEnded' => $row['timeEnded'],
                'timeCompleted' => $row['completedTime'],
                'Completed' => $row['completed'],
                'Notes' => $row['notes']
              );
              array_push($activities,$Activity);
            }
          }

          $response = array(
            'id' => $id,
            'name' => $resName,
            'surname' => $resSurname,
            'bio' => $resBio,
            'imgPath' => $resImgPath,
            'Activity' => $Activity
          );

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
      $response = array();
      $sql = "SELECT team5_app.Resident.resId as ResidentId, team5_app.Resident.name AS residentName, team5_app.Resident.surname AS residentSurname, team5_app.Resident.bio as ResidentBio, team5_app.Resident.imgPath as ResidentImgPath 
              FROM team5_app.Resident";
      // Query database
      $result = $conn->query($sql);

      // Loop through data of database
      if ($result->num_rows > 0)
      {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
          $Activities = array();

          $resName = $row["resName"];
          $resSurname = $row["resSurname"];
          $resBio = $row["resBio"];
          $resImgPath = $row["resImgPath"];
          $id = $row["resId"];

          $sql = "SELECT team5_app.Activity.* 
          FROM team5_app.Activity 
          WHERE team5_app.Activity.Resident_resId=" . $id;

          // Query database
          $secondResult = $conn->query($sql);

          // Loop through data of database
          if ($secondResult->num_rows > 0)
          { // output data of each row
            while ($secondRow = $secondResult->fetch_assoc()) {
              // Fill res with their activities
              $Activity = array(
                'id' => $row['idActivity'],
                'name' => $row['name'],
                'date' => $row['date'],
                'startTime' => $row['timeStart'],
                'endTime' => $row['timeEnd'],
                'timeStarted' => $row['timeStarted'],
                'timeEnded' => $row['timeEnded'],
                'timeCompleted' => $row['completedTime'],
                'Completed' => $row['completed'],
                'Notes' => $row['notes']
              );
              array_push($Activities,$Activity);
            }
          }

          $Resident = array(            
          'id' => $id,
          'name' => $resName,
          'surname' => $resSurname,
          'bio' => $resBio,
          'imgPath' => $resImgPath,
          'Activity' => $Activities
          );

          array_push($response, $Resident);
        }

        // Close connection
        $conn->close();
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
