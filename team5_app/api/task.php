<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mennolp
 * Date: 3/22/2018
 * Time: 2:38 PM
 */

use \Database as D;

/** Checking if action exists **/
if (isset($_REQUEST['action'])) {
    $action = $_REQUEST['action'];

    // Decoding json file
    $data = json_decode(file_get_contents('php://input'), true);
    print_r($data);

    if($action === "add")
    {

    } else if($action === "remove")
    {

    } else if($action === "edit")
    {

    }
}else {
    $response['status'] = array(
        'message' => 'No action found',
    );
}

$encoded = json_encode($response);
header('Content-type: application/json');
exit($encoded);