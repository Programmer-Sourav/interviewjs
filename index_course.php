<?php

require_once 'db.php';
require_once 'vendor/slim/slim/Slim/Slim.php';


\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$app->get('/available_colleges', 'getAvailableColleges');
$app->get('/available_courses/:collegeName', 'getAvailableCourses');
$app->post('/post_application_form', 'saveApplicationDetails');
$app->post('/upload_documents', 'uploadDocuments');
$app->run();


function getAvailableColleges()
{
    $sql = "SELECT * FROM CollegeDetails";
    try {
        $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB 
        $statement = $db->prepare($sql);
        $statement->execute();
        $availableColleges = $statement->fetchAll(PDO::FETCH_OBJ);
      
        $arr = [
            "status" => 200,
            "message" => "List of Colleges Found",
            "data" => $availableColleges
        ];
    } catch (PDOException $ex) {
        $arr = [
            "status" => 500,
            "message" => "Error, No Colleges Found.",
            "error" => $ex->getMessage() // Optionally include the error message for debugging
        ];
    }

    // Wrapping the response
    $arr1 = [
        "response" => $arr
    ];

    // Encode the array into a JSON string and send it as the response
    echo json_encode($arr1);
}


function getAvailableCourses($collegeName){
    $sql = "SELECT CUD.* FROM CourseDetails CUD INNER JOIN CollegeDetails CD ON CUD.collegeName = CD.collegeName
     WHERE CD.collegeName= :collegeName";

    try{
        $db = getDB2();
        $statement = $db->prepare( $sql );
        $statement->bindParam (":collegeName", $collegeName );
        $statement->execute();

        $courses = $statement->fetchAll(PDO::FETCH_OBJ);
        
        $arr = array (

            "status" => 200,
            "message" => "Course Details Found",
            "data" => $courses

        );

    }
    catch( PDOException $e  ){
        $arr = array (
            "status" => 500,
            "message" => "Internal Server Error. Error Fetching Course Details",
            "data" => array ()
        );
    }
    $arr1 = array (
        "response" => $arr
    );

    echo json_encode ( $arr1 );

}

function saveApplicationDetails(){
    $app = \Slim\Slim::getInstance ();
    $json = $app->request->getBody();
    $arr = array ();

 
    if($json!=null){
        $data = json_decode($json, true);
    
       
        if(!empty($data['firstname']) && !empty($data['lastname']) && !empty($data['parent_first_name']) && !empty($data['parent_last_name'])
        && !empty($data['schoolName']) && !empty($data['twelfth_marks']) && !empty($data['madhyamik_marks']) && !empty($data['entrance_test_type']) 
        && !empty($data['enter_rank']) && !empty($data['street_address_1']) && !empty($data['street_address_2']) && !empty($data['city'])
        && !empty($data['state']) && !empty($data['pinCode']) && !empty($data['phoneNumber']) && !empty($data['course_willing_to_study'])){
            
        

        $auto_student_id = "stu2024".floor(rand(31, 999)*31);
     
        $firstName = $data['firstname'];
        $lastName = $data['lastname'];
        $parentFirstName = $data['parent_first_name'];
        $parentLastName = $data['parent_last_name'];
        $schoolName = $data['schoolName'];
        $twelfthMarks = $data['twelfth_marks'];
        $madhyamikMarks = $data['madhyamik_marks'];
        $entranceTestType = $data['entrance_test_type'];
        $rank = $data['enter_rank'];
        $streetAddress1 = $data['street_address_1'];
        $streetAddress2 = $data['street_address_2'];
        $city = $data['city'];
        $state = $data['state'];
        $pinCode = $data['pinCode'];
        $phoneNumber = $data['phoneNumber'];
        $courseWillingToStudy = $data['course_willing_to_study'];


        $sql = "INSERT INTO ApplicationDetails(auto_student_id, stu_firstName, stu_lastName, parent_first_name, parent_last_name, schoolName, twelfth_marks, madhyamik_marks, entrance_test_type, student_rank, street_address_1, street_address_2, city, state, pinCode, phoneNumber, course_willing_to_study ) VALUES (:autoStudentId, :firstName, :lastName, :parent_first_name, :parent_last_name, :schoolName, :twelfth_marks, :madhyamik_marks, :entrance_test_type, :enter_rank, :street_address_1, :street_address_2, :city, :state, :pinCode, :phoneNumber, :course_willing_to_study)";
        try{
            $db = getDB2();
            $statement = $db->prepare($sql);
            $statement->bindParam(":autoStudentId", $auto_student_id);
            $statement->bindParam(":firstName", $firstName);
            $statement->bindParam(":firstName", $firstName);
            $statement->bindParam(":lastName", $lastName);
            $statement->bindParam(":parent_first_name", $parentFirstName);
            $statement->bindParam(":parent_last_name", $parentLastName);
            $statement->bindParam(":schoolName", $schoolName);
            $statement->bindParam(":twelfth_marks", $twelfthMarks);
            $statement->bindParam(":madhyamik_marks", $madhyamikMarks);
            $statement->bindParam(":entrance_test_type", $entranceTestType);
            $statement->bindParam(":enter_rank", $rank);
            $statement->bindParam(":street_address_1", $streetAddress1);
            $statement->bindParam(":street_address_2", $streetAddress2);
            $statement->bindParam(":city", $city);
            $statement->bindParam(":state", $state);
            $statement->bindParam(":pinCode", $pinCode);
            $statement->bindParam(":phoneNumber", $phoneNumber);
            $statement->bindParam(":course_willing_to_study", $courseWillingToStudy);
            $statement->execute();
            
         

            $arr = array (

                "status" => 200,
                "success"=> true,
                "message" => "Application Data successfully inserted.",
                "data"=>$json
    
            );
               

        }
        catch(PDOException $ex){
            $arr = array (
                "status" => 500,
                "success"=> false,
                "message" => "Internal Server Error. Error saving Application Details",
                "data"=>$json
            );
           
        }

    }
    }
    $arr1 = array (
        "response" => $arr
    );

    echo json_encode ( $arr1 );
}


function uploadDocuments(){

}


?>