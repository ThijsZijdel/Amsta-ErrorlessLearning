<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mennolp
 * Date: 3/22/2018
 * Time: 2:39 PM
 */

// Creating a prefix for the database class to get the database information.
use \Database as D;

/** Checking if action exists **/
if (isset($_REQUEST['action'])) {
    $action = $_REQUEST['action'];

    /** Login **/
    if ($action == "login") {
        if (isset($_REQUEST['password']) && isset($_REQUEST['username'])) {
            // Get all the information from the request
            $username = $_REQUEST['username'];
            $password = $_REQUEST['password'];

            // Create connection
            $conn = new mysqli(constant(D::$SERVER_NAME), constant(D::$USERNAME), constant(D::$PASSWORD));

            // Check connection
            if ($conn->connect_error) {
                $response['status'] = array(
                    'message' => 'Database connection error',
                );
            } else if (!empty($username) && !empty($password)) {
                $sql = "SELECT * FROM constanct(D::$DATABASE_NAME) team5_app.Employee where username=" . $username;
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    // Retrieve data
                    $row = $result->fetch_assoc();
                    // Close connection
                    $conn->close();
                    if ($password === $row["password"]) {
                        $response['Employee'] = array(
                            'id' => $row["id"],
                            'username' => $row["username"],
                            'name' => $row["name"],
                        );
                    } else {
                        $response['status'] = array(
                            'message' => 'Wrong password',
                        );
                    }
                } else {
                    $response['status'] = array(
                        'message' => 'No user found with username',
                    );
                }
            } else {
                $response['status'] = array(
                    'message' => 'Username and/or password is empty',
                );
            }
        } else {
            $response['status'] = array(
                'message' => 'Username and/or password has not been send',
            );
        }
    }
    /** End Login **/

    /** Logut **/
    else if ($action == "logout") {
        if (isset($_REQUEST['token'])) {

        } else {
            $response['status'] = array(
                'message' => 'Token has not been send',
            );
        }
    }
    /** End Logout **/
}
else {
    $response['status'] = array(
        'message' => 'No action found',
    );
}

$encoded = json_encode($response);
header('Content-type: application/json');
exit($encoded);
