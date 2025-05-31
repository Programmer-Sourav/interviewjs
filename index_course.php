<?php
ini_set('log_errors', 1);
ini_set('error_log', '/home3/traveoxg/public_html/error_log');

// Disable error display for production
ini_set('display_errors', 0);

require_once 'db.php';
require_once 'vendor/slim/slim/Slim/Slim.php';
require_once 'fpdf/fpdf.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$app->get('/available_colleges', 'authenticate', 'getAvailableColleges');
$app->get ('/available_colleges_by_course/:courseName', 'authenticate', 'getAvailableCollegesByCourse');
$app->get ('/available_brochures/:collegeName', 'authenticate', 'getAvailableBrochuresByCollege');
$app->get ('/available_courses/:collegeName', 'authenticate', 'getAvailableCourses');
$app->post('/post_application_form', 'authenticate', 'saveApplicationDetails');
$app->post('/upload_documents', /*'authenticate',*/ 'uploadDocuments');
$app->post('/post_annoucement', 'saveAnnouncementDetails');
$app->get ('/get_annoucement', 'getAnnouncementDetails');
$app->get ('/retrieve_document/:id', 'retrieveDocument');
$app->post('/upload_images', 'uploadImagesForSlider');
$app->get ('/retrieve_slider_images', 'retrieveSliderImages');
$app->post('/login', 'loginStudent');
$app->post('/admin_login', 'adminLogin');
$app->post('/institute_login', 'instituteLogin');
$app->post('/register_user','registerUser');
$app->get ('/get_courses', 'getCoursesAvailable');
$app->post('/save_course','saveCourseDetails');
$app->post('/upload_brochures','uploadBrochures');
$app->post('/upload_screenshots', 'uploadPaymentScreenshots');

$app->run();



function loginStudent() {
    $app = \Slim\Slim::getInstance();
    $json = $app->request->getBody();
    $data = json_decode($json, true);

    if (!empty($data['username']) && !empty($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        $sql = "SELECT * FROM users WHERE phonenumber = :phonenumber";
        try {
            $db = getDB2();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':phonenumber', $username);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
           
                    $secretKey = "SAP_123@DOCS#SECRET";
                    $issuedAt = time();
                    $expirationTime = $issuedAt + 3600;

                    $payload = [
                        "iat" => $issuedAt,
                        //"exp" => $expirationTime,
                        "user_id" => $user['id'],
                        "username" => $user['username']
                    ];

                    $jwt = JWT::encode($payload, $secretKey, 'HS256');
                    echo json_encode([
                        "status" => 200,
                        "message" => "Login successful",
                        "userDetails" => ["authToken"=> $jwt, "userId"=>$user['id'], "username"=>$user['username']],
                    ]);
                } else {
                    echo json_encode(["status" => 401, "message" => "Invalid credentials."]);
                }
            } 
         catch (PDOException $e) {
            echo json_encode(["status" => 500, "message" => "Database error.", "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => 400, "message" => "Missing username or password."]);
         }
}




function adminLogin() {
    $app = \Slim\Slim::getInstance();
    $json = $app->request->getBody();
    $data = json_decode($json, true);

    if (!empty($data['username']) && !empty($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        $sql = "SELECT * FROM users WHERE username = :username";
        try {
            $db = getDB2();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
           
                    $secretKey = "SAP_123@DOCS#SECRET";
                    $issuedAt = time();
                    $expirationTime = $issuedAt + 3600;

                    $payload = [
                        "iat" => $issuedAt,
                        //"exp" => $expirationTime,
                        "user_id" => $user['id'],
                        "username" => $user['username']
                    ];

                    $jwt = JWT::encode($payload, $secretKey, 'HS256');
                    echo json_encode([
                        "status" => 200,
                        "message" => "Login successful",
                        "userDetails" => ["authToken"=> $jwt, "userId"=>$user['id'], "username"=>$user['username']],
                    ]);
                } else {
                    echo json_encode(["status" => 401, "message" => "Invalid credentials."]);
                }
            } 
         catch (PDOException $e) {
            echo json_encode(["status" => 500, "message" => "Database error.", "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => 400, "message" => "Missing username or password."]);
         }
}


function instituteLogin() {
    $app = \Slim\Slim::getInstance();
    $json = $app->request->getBody();
    $data = json_decode($json, true);

    if (!empty($data['username']) && !empty($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        $sql = "SELECT * FROM users WHERE username = :username";
        try {
            $db = getDB2();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $hashedPassword = $user['password'];
                $salt = $user['salt'];

                // Verify password
                if (password_verify($password . $salt, $hashedPassword)) {
                    // Generate JWT token
                    $secretKey = "SAP_123@DOCS#SECRET"; // Replace with a strong secret key
                    $issuedAt = time();
                    $expirationTime = $issuedAt + 3600; // Token valid for 1 hour

                    $payload = [
                        "iat" => $issuedAt,
                        "exp" => $expirationTime,
                        "user_id" => $user['id'],
                        "username" => $user['username']
                    ];

                    $jwt = JWT::encode($payload, $secretKey, 'HS256');

                    echo json_encode([
                        "status" => 200,
                        "message" => "Login successful",
                        "token" => $jwt
                    ]);
                } else {
                    echo json_encode([
                        "status" => 401,
                        "message" => "Invalid credentials"
                    ]);
                }
            } else {
                echo json_encode([
                    "status" => 401,
                    "message" => "Invalid credentials"
                ]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                "status" => 500,
                "message" => "Database error",
                "error" => $e->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            "status" => 400,
            "message" => "Missing username or password"
        ]);
    }
}


function registerUser() {
    $app = \Slim\Slim::getInstance();
    $json = $app->request->getBody();
    $data = json_decode($json, true);

    if (!empty($data['username']) && !empty($data['password']) && !empty($data['userPhone'])) {
        $username = $data['username'];
        $password = $data['password'];
        $phoneNumber = $data['userPhone'];

        $db = getDB2();

        $sql1 = "SELECT * FROM users WHERE username = :username ";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam(':username', $username);
     
        $stmt1->execute();

        if ($stmt1->rowCount() > 0) {
            echo json_encode(["status" => 409, "message" => "Username already registered."]);
        } else {
            $sql = "INSERT INTO users (username, password, created_at, userType, phonenumber) VALUES (:username, :password, NOW(), 'Student', :phonenumber)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':phonenumber', $phoneNumber);

            if ($stmt->execute()) {
                // Generate JWT token after successful registration
                $userId = $db->lastInsertId(); // Get the last inserted user ID
                $secretKey = "SAP_123@DOCS#SECRET"; // Replace with a strong secret key
                $issuedAt = time();
                $expirationTime = $issuedAt + 3600; // Token valid for 1 hour

                $payload = [
                    "iat" => $issuedAt,
                    "exp" => $expirationTime,
                    "user_id" => $userId,
                    "username" => $username
                ];

                $jwt = JWT::encode($payload, $secretKey, 'HS256');

                echo json_encode([
                    "status" => 200,
                    "message" => "User registered successfully.",
                    "userDetails" => ["authToken"=> $jwt, "userId"=>$userId, "username"=>$username],
                ]);
            } else {
                echo json_encode(["status" => 500, "message" => "Error registering user."]);
            }
        }
    } else {
        echo json_encode(["status" => 400, "message" => "Missing username or password."]);
    }
}


function authenticate(\Slim\Route $route) {
    $app = \Slim\Slim::getInstance();
    $headers = $app->request->headers;

    if (!isset($headers['Authorization'])) {
        $app->halt(401, json_encode(['error' => 'Unauthorized. Token is missing.']));
    }

    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader); // Extract the token (assuming Bearer token)

    try {
        $secretKey = "SAP_123@DOCS#SECRET"; // Replace with your actual secret key
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

        // Optional: Set the decoded payload (user data) in the Slim app instance
        $app->user = $decoded;

    } catch (\Firebase\JWT\ExpiredException $e) {
        $app->halt(401, json_encode(['error' => 'Token has expired.']));
    } catch (\Exception $e) {
        $app->halt(401, json_encode(['error' => 'Invalid token.', 'details' => $e->getMessage()]));
    }
}

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


function getAvailableBrochuresByCollege($collegename)
{
    $sql = "SELECT * FROM `brochureLinks` WHERE collegeName LIKE :collegeName";
    $searchTerm = "%$collegename%";
    try {
        $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB 
        $statement = $db->prepare($sql);
        $statement->bindParam (":collegeName", $searchTerm );
        $statement->execute();
        $availableColleges = $statement->fetchAll(PDO::FETCH_OBJ);
      
        $arr = [
            "status" => 200,
            "message" => "List of Brochures Found",
            "data" => $availableColleges
        ];
    } catch (PDOException $ex) {
        $arr = [
            "status" => 500,
            "message" => "Error, No Brochures Found.",
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

function getAvailableCollegesByCourse($coursename)
{
    $sql = "SELECT * FROM `CollegeDetails` WHERE filterBy LIKE :coursename";
    $searchTerm = "%$coursename%";
    try {
        $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB 
        $statement = $db->prepare($sql);
        $statement->bindParam (":coursename", $searchTerm );
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

// function getAvailableCollegesByCourse($coursename)
// {
//     // Exploding the comma-separated string into an array
//     $coursenameExploded = explode(",", $coursename);
//     $length = count($coursenameExploded);

//     // Start building the SQL query
//     $sql = "SELECT * FROM `CollegeDetails` WHERE ";

//     // Prepare an array to store the `LIKE` conditions
//     $likeConditions = [];

//     if ($length > 1) {
//         // Loop through the exploded array and create a `LIKE` condition for each value
//         for ($i = 0; $i < $length; $i++) {
//             // Add each LIKE condition (with wildcard `%`) to the array
//             $likeConditions[] = "filterBy LIKE :coursename" . $i;
//         }

//         // Join the conditions with `OR` (for multiple LIKE conditions)
//         $sql .= implode(" OR ", $likeConditions);
//     } else {
//         // If there's only one value, use LIKE with the single value
//         $sql .= "filterBy LIKE :coursename0";
//     }

//     // Prepare the search term
//     $arr = [];
//     try {
//         $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB connection
//         $statement = $db->prepare($sql);

//         // Bind parameters for each course name (with wildcards)
//         for ($i = 0; $i < $length; $i++) {
//             $searchTerm = "%" . $coursenameExploded[$i] . "%";
//             $statement->bindValue(":coursename" . $i, $searchTerm, PDO::PARAM_STR);
//         }

//         // If there's only one course name, bind the :coursename0 parameter
//         if ($length === 1) {
//             $searchTerm = "%" . $coursenameExploded[0] . "%";
//             $statement->bindValue(":coursename0", $searchTerm, PDO::PARAM_STR);
//         }

//         // Execute the query
//         $statement->execute();

//         // Fetch the results
//         $availableColleges = $statement->fetchAll(PDO::FETCH_OBJ);

//         // Prepare the response
//         $arr = [
//             "status" => 200,
//             "message" => "List of Colleges Found",
//             "data" => $availableColleges
//         ];
//     } catch (PDOException $ex) {
//         // Error handling
//         $arr = [
//             "status" => 500,
//             "message" => "Error, No Colleges Found.",
//             "error" => $ex->getMessage() // Optionally include the error message for debugging
//         ];
//     }

//     // Wrapping the response
//     $arr1 = [
//         "response" => $arr
//     ];

//     // Encode the array into a JSON string and send it as the response
//     echo json_encode($arr1);
// }


function getAnnouncementDetails(){
    $sql = "SELECT 
    noticeboard.*, 
    SapDocuments.* 
FROM 
    noticeboard
LEFT JOIN 
    SapDocuments 
ON 
    noticeboard.announcementId = SapDocuments.announcementId
WHERE 
    noticeboard.announcementId != '' 
    AND (SapDocuments.announcementId IS NOT NULL OR SapDocuments.announcementId IS NULL);
";
    try {
        $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB 
        $statement = $db->prepare($sql);
        $statement->execute();
        $availableNotices = $statement->fetchAll(PDO::FETCH_OBJ);
      
        $arr = [
            "status" => 200,
            "message" => "All Notices!",
            "data" => $availableNotices 
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


function getCoursesAvailable(){
    $sql = "SELECT * FROM `CoursesAvailable` GROUP BY coursename ORDER BY coursename ASC";
    try {
        $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB 
        $statement = $db->prepare($sql);
        $statement->execute();
        $availableCourses = $statement->fetchAll(PDO::FETCH_OBJ);
      
        $arr = [
            "status" => 200,
            "message" => "All Courses!",
            "data" => $availableCourses
        ];
    } catch (PDOException $ex) {
        $arr = [
            "status" => 500,
            "message" => "Error, No Courses Found.",
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
            "courses" => $courses,
            "error" => "True"

        );

    }
    catch( PDOException $e  ){
        $arr = array (
            "status" => 500,
            "message" => "Internal Server Error. Error Fetching Course Details",
            "courses" => array (),
            "error"=>"false"
        );
    }
    $arr1 = array (
        "response" => $arr
    );

    echo json_encode ( $arr1 );

}


function saveAnnouncementDetails(){
    $app = \Slim\Slim::getInstance ();
    $json = $app->request->getBody();
    $arr = array ();

 
    if($json!=null){
        $data = json_decode($json, true);

        if(!empty($data['header']) && !empty($data['notice']) && !empty($data['announcementId'])){
            $header = $data['header'];
            $notice = $data['notice'];
            $announcementId = $data['announcementId'];
         
    
            $sql = "INSERT INTO noticeboard(header, announcementdate, notice, announcementId) VALUES (:header, NOW(), :notice, :announcementId)";
            try{
                $db = getDB2();
                $statement = $db->prepare($sql);
                $statement->bindParam(":header", $header);
                $statement->bindParam(":notice", $notice);
                $statement->bindParam(":announcementId", $announcementId);
                $statement->execute();
            
                $arr = array (
    
                    "status" => 200,
                    "success"=> true,
                    "message" => "Application Data successfully inserted.",
                    "data"=>$data
        
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

function saveCourseDetails(){
    $app = \Slim\Slim::getInstance ();
    $json = $app->request->getBody();
    $arr = array ();

 
    if($json!=null){
        $data = json_decode($json, true);

        if(!empty($data['coursename'])){
    
            $coursename = $data['coursename'];
         
    
            $sql = "INSERT INTO CoursesAvailable(coursename) VALUES (:coursename)";
            try{
                $db = getDB2();
                $statement = $db->prepare($sql);
                $statement->bindParam(":coursename", $coursename);
                $statement->execute();
            
                $arr = array (
    
                    "status" => 200,
                    "success"=> true,
                    "message" => "Course Data successfully inserted.",
                    "data"=>$data
        
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

function saveApplicationDetails(){
    $app = \Slim\Slim::getInstance ();
    $json = $app->request->getBody();
    $arr = array ();

 
    if($json!=null){
        $data = json_decode($json, true);
    
       
        if(!empty($data['firstname']) && !empty($data['lastname']) && !empty($data['parent_first_name']) && !empty($data['parent_last_name'])
        && !empty($data['twelfth_marks']) && !empty($data['madhyamik_marks']) && !empty($data['entrance_test_type']) 
        && !empty($data['enter_rank']) && !empty($data['street_address_1']) && !empty($data['street_address_2']) && !empty($data['city'])
        && !empty($data['state']) && !empty($data['pinCode']) && !empty($data['phoneNumber']) && !empty($data['course_willing_to_study']) 
        && !empty($data['college_willing_to_study']) && !empty($data['studentEmail']) && !empty($data['username'])
        && !empty($data['schoolName']) && !empty($data['passingYear']) && !empty($data['rollNumber']) && !empty($data['totalMarks']) 
        && !empty($data['obtainedMarks']) && !empty($data['scoreTenth'])
        && !empty($data['schoolName12th']) && !empty($data['passingYear12th']) && !empty($data['rollNumber12th']) && !empty($data['totalMarks12th'])
        && !empty($data['obtainedMarks12th'])  && !empty($data['score12th']) && !empty($data['caste']) 
        && !empty($data['mothers_first_name']) && !empty($data['mothers_last_name'])){
            
            $username = $data['username'];
            $sql1 = "SELECT studentUniqueId FROM users WHERE username = :username and studentUniqueId != ''";
            $db = getDB2();
           $stmt1 = $db->prepare($sql1);
           $stmt1->bindParam(':username', $username);
          $stmt1->execute();
          $auto_student_id = "";
if ($stmt1->rowCount() > 0) {
    $result = $stmt1->fetch(PDO::FETCH_ASSOC);
    $auto_student_id = $result['studentUniqueId'];
} else {
    $auto_student_id = "SAP2025" . floor(rand(31, 999) * 31);
}

     
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
        $studentEmail = $data['studentEmail'];
        $selectedCollege = $data['college_willing_to_study'];
        $mothersFirstName = $data['mothers_first_name'];
        $mothersLastName = $data['mothers_last_name'];
        $tenthSchoolName = $data['schoolName'];
        $tenthPassingYear = $data['passingYear'];
        $tenthRollNumber = $data['rollNumber'];
        $tenthTotalMarks = $data['totalMarks'];
        $tenthObtainedMarks = $data['obtainedMarks'];
        $tenthScorePercent = $data['scoreTenth'];
        $twelfthSchoolName = $data['schoolName12th'];
        $twelfthPassingYear = $data['passingYear12th'];
        $twelfthRollNumber = $data['rollNumber12th'];
        $twelfthTotalMarks = $data['totalMarks12th'];
        $twelfthObtainedMarks = $data['obtainedMarks12th'];
        $twelfthScorePercent = $data['score12th'];
        $caste = $data['caste'];


    
        $sql = "INSERT INTO ApplicationDetails(auto_student_id, stu_firstName, stu_lastName, parent_first_name, parent_last_name, schoolName, twelfth_marks, madhyamik_marks, entrance_test_type, student_rank, street_address_1, street_address_2, city, state, pinCode, phoneNumber, course_willing_to_study, student_email, college_willing_to_study,
         mothersFirstName, mothersLastName, tenthSchoolName, tenthPassingYear, tenthRollNumber,tenthTotalMarks,
         tenthObtainedMarks, tenthScorePercent,twelfthSchoolName,twelfthPassingYear,twelfthRollNumber,twelfthTotalMarks,
         twelfthObtainedMarks,twelfthScorePercent, caste ) VALUES (:autoStudentId, :firstName, :lastName, :parent_first_name, :parent_last_name, :schoolName, :twelfth_marks, :madhyamik_marks, :entrance_test_type, :enter_rank, :street_address_1, :street_address_2, :city, :state, :pinCode, :phoneNumber,
          :course_willing_to_study, :student_email, :college_willing_to_study,
         :mothersFirstName, :mothersLastName, :tenthSchoolName, :tenthPassingYear, :tenthRollNumber, :tenthTotalMarks,
         :tenthObtainedMarks, :tenthScorePercent, :twelfthSchoolName, :twelfthPassingYear, :twelfthRollNumber, :twelfthTotalMarks,
         :twelfthObtainedMarks, :twelfthScorePercent, :caste)";
        try{
            $db = getDB2();
            $statement = $db->prepare($sql);
            $statement->bindParam(":autoStudentId", $auto_student_id);
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
            $statement->bindParam(":college_willing_to_study", $selectedCollege);
            $statement ->bindParam(":student_email", $studentEmail);
            $statement ->bindParam(":mothersFirstName", $mothersFirstName);
            $statement ->bindParam(":mothersLastName", $mothersLastName);
            $statement ->bindParam(":tenthSchoolName", $tenthSchoolName);
            $statement ->bindParam(":tenthPassingYear", $tenthPassingYear);
            $statement ->bindParam(":tenthRollNumber", $tenthRollNumber);
            $statement ->bindParam(":tenthTotalMarks", $tenthTotalMarks);
            $statement ->bindParam(":tenthObtainedMarks", $tenthObtainedMarks);
            $statement ->bindParam(":tenthScorePercent", $tenthScorePercent);
            $statement ->bindParam(":twelfthSchoolName", $twelfthSchoolName);
            $statement ->bindParam(":twelfthPassingYear", $twelfthPassingYear);
            $statement ->bindParam(":twelfthRollNumber", $twelfthRollNumber);
            $statement ->bindParam(":twelfthTotalMarks", $twelfthTotalMarks);
            $statement ->bindParam(":twelfthObtainedMarks", $twelfthObtainedMarks);
            $statement ->bindParam(":twelfthScorePercent", $twelfthScorePercent);
            $statement ->bindParam(":caste", $caste);
            $statement->execute();
          
         $emailStatus = generatePdfReport($auto_student_id, $firstName, $studentEmail);

         $sql = "UPDATE users SET studentUniqueId= :studentUniqueId WHERE username = :username";
         try{
             $db = getDB2();
             $statement = $db->prepare($sql);
             $statement->bindParam(":studentUniqueId", $auto_student_id);
             $statement->bindParam(":username", $username);
             $statement->execute();
          }
          catch(PDOException $ex){
            $arr = array (
                "status" => 500,
                "success"=> false,
                "message" => "Not able to update database",
                "data"=>$json
            );
          }
             
            $arr = array (

                "status" => 200,
                "success"=> true,
                "message" => "Application Data successfully inserted.",
                "data"=>$data,
                "studentId"=>$auto_student_id,
                "emailStatus"=>$emailStatus
    
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


// Function to handle the file upload
function uploadDocuments()
{
    $app = \Slim\Slim::getInstance();

    // Directory to save uploaded files
    $directory = __DIR__ . '/uploads';

    if (!file_exists($directory)) {
        mkdir($directory, 0777, true); // Ensure the directory exists
    }

    // Check if files are uploaded
    if (!isset($_FILES['file'])) {
        echo json_encode(['error' => 'No file uploaded']);
        return;
    }

    // Get the username from the POST data
    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $announcementId = isset($_POST['announcementId']) ? $_POST['announcementId'] : null;
    if (!$username) {
        echo json_encode(['error' => 'Username is required']);
        return;
    }

    $responses = [];
    $uploadedFiles = $_FILES['file'];

    // Validate structure: Handle multiple or single uploads
    $fileCount = is_array($uploadedFiles['name']) ? count($uploadedFiles['name']) : 1;

    for ($i = 0; $i < $fileCount; $i++) {
        // Adjust access based on whether it's a single or multiple upload
        $name = is_array($uploadedFiles['name']) ? $uploadedFiles['name'][$i] : $uploadedFiles['name'];
        $tmpName = is_array($uploadedFiles['tmp_name']) ? $uploadedFiles['tmp_name'][$i] : $uploadedFiles['tmp_name'];
        $error = is_array($uploadedFiles['error']) ? $uploadedFiles['error'][$i] : $uploadedFiles['error'];

        if ($error !== UPLOAD_ERR_OK) {
            $responses[] = ['error' => 'Error during file upload for file: ' . $name];
            continue;
        }

        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%s', $basename, $extension);
        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;

        $sql1 = "SELECT studentUniqueId FROM users WHERE username = :username AND studentUniqueId != ''";
        $db = getDB2();
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam(':username', $username);
        $stmt1->execute();

        $auto_student_id = "";
        if ($stmt1->rowCount() > 0) {
            $result = $stmt1->fetch(PDO::FETCH_ASSOC);
            $auto_student_id = $result['studentUniqueId'];
        }

        if (move_uploaded_file($tmpName, $targetPath)) {
            try {
                $filePath = $targetPath;
                $newPath = str_replace('/home3/traveoxg/public_html/', 'https://www.travelsawari.com/', $filePath);

                $stmt = $db->prepare("INSERT INTO SapDocuments(studentUniqueId, filePath, uploaded_at, announcementId) VALUES (:studentUniqueId, :file_path, NOW(), :announcementId)");
                $stmt->bindParam(':studentUniqueId', $auto_student_id);
                $stmt->bindParam(':file_path', $newPath);
                $stmt->bindParam(':announcementId', $announcementId);
                $stmt->execute();

                $responses[] = [
                    'message' => 'File uploaded and saved to database successfully',
                    'filename' => $filename,
                    'file_path' => $filePath,
                ];
            } catch (PDOException $e) {
                $responses[] = ['error' => 'Database error: ' . $e->getMessage()];
            }
        } else {
            $responses[] = ['error' => 'Failed to move uploaded file: ' . $name];
        }
    }

    echo json_encode($responses);
}


function uploadBrochures()
{
    $app = \Slim\Slim::getInstance();

    // Directory to save uploaded files
    $directory = __DIR__ . '/brochures';

    if (!file_exists($directory)) {
        mkdir($directory, 0777, true); // Ensure the directory exists
    }

    // Check if files are uploaded
    if (!isset($_FILES['file'])) {
        echo json_encode(['error' => 'No file uploaded']);
        return;
    }
    
    // Get the username from the POST data
    $collegename = isset($_POST['collegeName']) ? $_POST['collegeName'] : null;
    //$announcementId = isset($_POST['announcementId']) ? $_POST['announcementId'] : null;
  
    if (!$collegename) {
        echo json_encode(['error' => 'Username is required']);
        return;
    }

    $responses = [];
    $uploadedFiles = $_FILES['file'];

    // Validate structure: Handle multiple or single uploads
    $fileCount = is_array($uploadedFiles['name']) ? count($uploadedFiles['name']) : 1;

    for ($i = 0; $i < $fileCount; $i++) {
        // Adjust access based on whether it's a single or multiple upload
        $name = is_array($uploadedFiles['name']) ? $uploadedFiles['name'][$i] : $uploadedFiles['name'];
        $tmpName = is_array($uploadedFiles['tmp_name']) ? $uploadedFiles['tmp_name'][$i] : $uploadedFiles['tmp_name'];
        $error = is_array($uploadedFiles['error']) ? $uploadedFiles['error'][$i] : $uploadedFiles['error'];

        if ($error !== UPLOAD_ERR_OK) {
            $responses[] = ['error' => 'Error during file upload for file: ' . $name];
            continue;
        }

        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%s', $basename, $extension);
        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;

        if (move_uploaded_file($tmpName, $targetPath)) {
            try {
                $filePath = $targetPath;
                $newPath = str_replace('/home3/traveoxg/public_html/', 'https://www.travelsawari.com/', $filePath);
                $db = getDB2();
                $stmt = $db->prepare("INSERT INTO brochureLinks(brochureImages,collegeName) VALUES (:brochureImages, :collegeName)");
                $stmt->bindParam(':brochureImages', $newPath);
                $stmt->bindParam(':collegeName', $collegename);
                $stmt->execute();

                $responses[] = [
                    'message' => 'File uploaded and saved to database successfully',
                    'filename' => $filename,
                    'file_path' => $filePath,
                ];
            } catch (PDOException $e) {
                $responses[] = ['error' => 'Database error: ' . $e->getMessage()];
            }
        } else {
            $responses[] = ['error' => 'Failed to move uploaded file: ' . $name];
        }
    }

    echo json_encode($responses);
}



function uploadImagesForSlider()
{
    $directory = __DIR__ . '/SliderImages';

    if (!file_exists($directory)) {
        mkdir($directory, 0777, true);
    }

    if (!isset($_FILES['file'])) {
        echo json_encode(['error' => 'No files uploaded']);
        return;
    }

    $responses = [];
    $uploadedFiles = $_FILES['file'];
    $imageLevel = isset($_POST['level']) ? $_POST['level'] : null;

    // Validate structure: Handle multiple or single uploads
    $fileCount = is_array($uploadedFiles['name']) ? count($uploadedFiles) : 1;
    print_r($_FILES);
    for ($i = 0; $i < $fileCount; $i++) {
        // Adjust access based on whether it's a single or multiple upload
        $name = is_array($uploadedFiles['name']) ? $uploadedFiles['name'][$i] : $uploadedFiles['name'];
        $tmpName = is_array($uploadedFiles['tmp_name']) ? $uploadedFiles['tmp_name'][$i] : $uploadedFiles['tmp_name'];
        $error = is_array($uploadedFiles['error']) ? $uploadedFiles['error'][$i] : $uploadedFiles['error'];

        if ($error !== UPLOAD_ERR_OK) {
            $responses[] = ['error' => 'Error during file upload for file: ' . $name];
            continue;
        }

        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%s', $basename, $extension);
        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;
        if (move_uploaded_file($tmpName, $targetPath)) {
            try {
                $db = getDB2();
                $filePath = $targetPath;
                $newPath = str_replace('/home3/traveoxg/public_html/', 'https://www.travelsawari.com/', $filePath);
               
                $stmt = $db->prepare("INSERT INTO SliderImagesUrls(filePath, uploaded_at, sliderLevel) VALUES (:file_path, NOW(), :sliderLevel)");
                $stmt->bindParam(':file_path', $newPath);
                $stmt->bindParam(':sliderLevel', $imageLevel);
                $stmt->execute();

                $responses[] = [
                    'message' => 'File uploaded and saved to database successfully',
                    'filename' => $filename,
                    'file_path' => $filePath,
                ];
            } catch (PDOException $e) {
                $responses[] = [
                    'error' => 'Database error for file: ' . $filename,
                    'details' => $e->getMessage(),
                ];
            }
        } else {
            $responses[] = ['error' => 'Failed to move uploaded file: ' . $name];
        }
    }

    echo json_encode($responses);
}

function uploadPaymentScreenshots()
{
    $directory = __DIR__ . '/ScreenshotsImages';

    if (!file_exists($directory)) {
        mkdir($directory, 0777, true);
    }

    if (!isset($_FILES['file'])) {
        echo json_encode(['error' => 'No files uploaded']);
        return;
    }

    $responses = [];
    $uploadedFiles = $_FILES['file'];
    $studentUniqueId = isset($_POST['studentUniqueId'])? $_POST['studentUniqueId'] : null;
    $paymentDateTime = isset($_POST['paymentDateTime'])? $_POST['paymentDateTime'] : null;
    $paymentAmount = isset($_POST['paymentamount'])? $_POST['paymentamount'] : null;
    $upiId = isset($_POST['upiId'])? $_POST['upiId'] : null;
    $status = isset($_POST['status'])? $_POST['status'] : null;
    //$imageLevel = isset($_POST['level']) ? $_POST['level'] : null;

    // Validate structure: Handle multiple or single uploads
    $fileCount = is_array($uploadedFiles['name']) ? count($uploadedFiles) : 1;
    print_r($_FILES);
    for ($i = 0; $i < $fileCount; $i++) {
        // Adjust access based on whether it's a single or multiple upload
        $name = is_array($uploadedFiles['name']) ? $uploadedFiles['name'][$i] : $uploadedFiles['name'];
        $tmpName = is_array($uploadedFiles['tmp_name']) ? $uploadedFiles['tmp_name'][$i] : $uploadedFiles['tmp_name'];
        $error = is_array($uploadedFiles['error']) ? $uploadedFiles['error'][$i] : $uploadedFiles['error'];

        if ($error !== UPLOAD_ERR_OK) {
            $responses[] = ['error' => 'Error during file upload for file: ' . $name];
            continue;
        }

        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%s', $basename, $extension);
        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;
        if (move_uploaded_file($tmpName, $targetPath)) {
            try {
                $db = getDB2();
                $filePath = $targetPath;
                $newPath = str_replace('/home3/traveoxg/public_html/', 'https://www.travelsawari.com/', $filePath);
               
                $stmt = $db->prepare("INSERT INTO PaymentDetails(filePath, uploaded_at, studentUniqueId, paymentDateTime, paymentamount, upiId, status) VALUES (:file_path, NOW(), :studentUniqueId, :paymentDateTime, :paymentamount, :upiId, :status)");
                $stmt->bindParam(':file_path', $newPath);
                $stmt->bindParam(':studentUniqueId', $studentUniqueId);
                $stmt->bindParam(':paymentDateTime',$paymentDateTime); 
                $stmt->bindParam(':paymentamount',$paymentAmount);
                $stmt->bindParam(':upiId',$upiId); 
                $stmt->bindParam(':status',$status);
                $stmt->execute();

                $responses[] = [
                    'message' => 'File uploaded and saved to database successfully',
                    'filename' => $filename,
                    'file_path' => $filePath,
                ];
            } catch (PDOException $e) {
                $responses[] = [
                    'error' => 'Database error for file: ' . $filename,
                    'details' => $e->getMessage(),
                ];
            }
        } else {
            $responses[] = ['error' => 'Failed to move uploaded file: ' . $name];
        }
    }

    echo json_encode($responses);
}


// Function to handle file retrieval
function retrieveDocument($id)
{
    try {
        // Fetch file path from database
        $db = getDBConnection();
        $stmt = $db->prepare("SELECT filePath FROM SapDocuments WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $file = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($file && file_exists($file['filePath'])) {
            $filePath = $file['filePath'];
            $fileName = basename($filePath);

            // Return the file as a downloadable response
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . $fileName . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
            exit;
        } else {
            echo json_encode(['error' => 'File not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function generatePdfReport($studentUniqueId, $studentName, $studentEmail) {
    $db = getDB2();
     //echo "2222 ".$studentUniqueId;
     $filePathImage = __DIR__ . '/pdfbg/bgimage.jpeg';

    try {
        // Fetch data from the database
        $stmt = $db->prepare("SELECT * FROM ApplicationDetails WHERE auto_student_id = :autoStudentId and id = (Select MAX(id) from ApplicationDetails)");
        $stmt->bindParam(":autoStudentId", $studentUniqueId); // Bind the parameter
        $stmt->execute(); // Execute the prepared statement
      
        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch a single row as an associative array

        // Check if data exists
        if (empty($user)) {
            echo "No data available to generate the report.";
            exit;
        }

        // Initialize FPDF
        $pdf = new FPDF();
        $pdf->AddPage();

        
// Function to add image as background to each page
function addBackgroundImage($pdf, $filePathImage) {
    // Set the image on each page
    $pdf->Image($filePathImage, 0, 0, 210, 297);  // Fit the image to the entire A4 page (210mm x 297mm)
}

// Add the image as background to the first page
addBackgroundImage($pdf, $filePathImage);

        $pdf->SetFont('Arial', 'B', 16);

        // Add title
        $pdf->Cell(190, 10, '', 0, 1, 'C');
        $pdf->Ln(10);

        $jsonData = $user['college_willing_to_study'];
        $data = json_decode($jsonData, true);

        if ($data === null) {
            echo "Error decoding JSON data.";
            return;
        }
        // echo "JSONDATA ".$jsonData;
        $traversedData = traverseCourseAndStatus($data);
        // Define column headers and user values
        $fields = [
            'Unique Id' => $user['auto_student_id'],
            'First Name' => $user['stu_firstName'],
            'Last Name' => $user['stu_lastName'],
            'Parents First Name' => $user['parent_first_name'],
            'Parents Last Name' => $user['parent_last_name'],
            'Mothers First Name' => $user['mothersFirstName'],
            'Mothers Last Name' => $user['mothersLastName'],
            'School Name' => $user['schoolName'],
            'Twelfth Marks' => $user['twelfth_marks'],
            'Tenth Marks' => $user['madhyamik_marks'],
            'Entrance Test' => $user['entrance_test_type'],
            'Student Rank' => $user['student_rank'],
            'Street Address 1' => $user['street_address_1'],
            'Street Address 2' => $user['street_address_2'],
            'City' => $user['city'],
            'State' => $user['state'],
            'Pincode' => $user['pinCode'],
            'Phone Number' => $user['phoneNumber'],
            'College Willing To Study' => $traversedData,
            'Student Email' => $user['student_email'],
            'Tenth School Name' => $user['tenthSchoolName'],
            'Tenth Passing Year' => $user['tenthPassingYear'],
            'Tenth Roll Number' => $user['tenthRollNumber'],
            'Tenth Total Marks' => $user['tenthTotalMarks'],
            'Tenth Obtained Marks' => $user['tenthObtainedMarks'],
            'Tenth Score' => $user['tenthScorePercent'],
            '12th School Name' => $user['twelfthSchoolName'],
            '12th Passing Year' => $user['twelfthPassingYear'],
            '12th Roll Number' => $user['twelfthRollNumber'],
            '12th Total Marks' => $user['twelfthTotalMarks'],
            '12th Obtained Marks' => $user['twelfthObtainedMarks'],
            '12th Score' => $user['twelfthScorePercent'],
            'Caste Selected' => $user['caste']
        ];

        // Add table with headers and values
       // Set font for table headers
$pdf->SetFont('Arial', 'B', 12);

// Column widths (adjust these values according to your needs)
$widths = [50, 140];

// Loop through the fields and add them to the table
$pdf->SetFont('Arial', 'B', 12);  // Header font
foreach ($fields as $header => $value) {
    // Calculate the row height based on the content
    $height = 10;  // Default height
    if (strlen($value) > 40) {
        $height = ceil(strlen($value) / 40) * 2;  // Adjust the multiplier/divisor as needed
    }

    // Header
    $pdf->Cell($widths[0], $height, $header, 1, 0, 'L');
    
    // Value
    $pdf->SetFont('Arial', '', 12);  // Content font
    $pdf->MultiCell($widths[1], $height, $value, 1, 'L');

    //$pdf->Ln(); // Line break after each row
}

// Save PDF to a file
$filePath = __DIR__ . '/Reports/Student_Report_' . $user['stu_firstName'] . '_' . $user['auto_student_id'] . '.pdf';
$pdf->Output('F', $filePath);  // Save PDF to file


        // Send Email with the PDF
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->SMTPSecure = 'tls';
            $mail->SMTPAuth = true;
            $mail->Username = "studentadmissionpoint@gmail.com";
            $mail->Password = "xnkv pmka xjlr fpdp"; // Application password

            // Email Configuration
            $mail->setFrom('studentadmissionpoint@gmail.com', 'Students Admission Point');
            $mail->addAddress($studentEmail, $studentName);
            $mail->addAddress("studentadmissionpoint@gmail.com", $studentName);
            $mail->Subject = 'Submitted Application Form by ' . $studentName;
            $mail->Body = 'Please find the submitted report.';
            $mail->AltBody = 'Please find the attached student report.';

            // Attach the generated PDF
            $mail->addAttachment($filePath);

            // Send the email
            if ($mail->send()) {
                return 'Email has been sent successfully.';
            } else {
                return 'Failed to send email. Error: ' . $mail->ErrorInfo;
            }

            // Cleanup: Delete the file after sending
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        } catch (Exception $e) {
            return 'Email could not be sent. Error: '.$mail->ErrorInfo;
        }
    } catch (PDOException $e) {
        return  json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function retrieveSliderImages(){
    ///ORDER BY uploaded_at DESC LIMIT 15
    $sql = "SELECT * FROM SliderImagesUrls WHERE sliderLevel!=''";
    try {
        $db = getDB2(); // Assumes getDB2() is a valid function that returns a DB 
        $statement = $db->prepare($sql);
        $statement->execute();
        $availableImages = $statement->fetchAll(PDO::FETCH_OBJ);
      
        $arr = [
            "status" => 200,
            "message" => "List of Images Found",
            "data" => $availableImages
        ];
    } catch (PDOException $ex) {
        $arr = [
            "status" => 500,
            "message" => "Error, No Images Found.",
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

function traverseCourseAndStatus($data) {
    $result = "";
    foreach ($data as $course => $status) {
        $result = $result . "Course: $course, Status: $status\n";
    }
    return $result;
}



// function generatePdfReport($studentUniqueId, $studentName, $studentEmail) {
  
//      $db = getDB2();

//     try {
//         // Fetch data from the database
//       $stmt = $db->prepare("SELECT stu_firstName, stu_lastName, parent_first_name, parent_last_name from ApplicationDetails WHERE auto_student_id = :autoStudentId");
//       $stmt->bindParam(":autoStudentId", $studentUniqueId, PDO::PARAM_INT); // Bind the parameter
//       $stmt->execute(); // Execute the prepared statement
//       $users = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows as an associative array
     
//         // Check if data exists
//         if (empty($users)) {
//             echo "No data available to generate the report.";
//             exit;
//         }

//         // Initialize FPDF
//         $pdf = new FPDF();
//         $pdf->AddPage();
//         $pdf->SetFont('Arial', 'B', 16);

//         // Add title
//         $pdf->Cell(190, 10, 'User Report', 0, 1, 'C');
//         $pdf->Ln(10);

//         // Add table header
//         $pdf->SetFont('Arial', 'B', 12);
//         $pdf->Cell(60, 10, 'Unique Id', 1, 0);
//         $pdf->Ln(); // Move to the next line
//         $pdf->Cell(60, 10, 'First Name', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Last Name', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Parents First Name', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Parents Last Name', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'School Name', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Twelfth Marks', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Tenth Marks', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Entrance Test', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Student Rank', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Street Address 1', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Street Address 2', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'City', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'State', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Pincode', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Phone Number', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Course Willing To Study', 1, 0);
//         $pdf->Ln();
//         $pdf->Cell(60, 10, 'Student Email', 1, 0);
//         $pdf->Ln();

//         // Add table rows
//         $pdf->SetFont('Arial', '', 12);
//         foreach ($users as $user) {
//             $pdf->Cell(70, 30, $user['auto_student_id'], 1);
//             $pdf->Cell(70, 30, $user['stu_firstName'], 1);
//             $pdf->Cell(70, 30, $user['stu_lastName'], 1);
//             $pdf->Cell(70, 30, $user['parent_first_name'], 1);
//             $pdf->Cell(70, 30, $user['parent_last_name'], 1);
//             $pdf->Cell(70, 30, $user['schoolName'], 1);
//             $pdf->Cell(70, 30, $user['twelfth_marks'], 1);
//             $pdf->Cell(70, 30, $user['madhyamik_marks'], 1);
//             $pdf->Cell(70, 30, $user['entrance_test_type'], 1);
//             $pdf->Cell(70, 30, $user['student_rank'], 1);
//             $pdf->Cell(70, 30, $user['street_address_1'], 1);
//             $pdf->Cell(70, 30, $user['street_address_2'], 1);
//             $pdf->Cell(70, 30, $user['city'], 1);
//             $pdf->Cell(70, 30, $user['state'], 1);
//             $pdf->Cell(70, 30, $user['pinCode'], 1);
//             $pdf->Cell(70, 30, $user['phoneNumber'], 1);
//             $pdf->Cell(70, 30, $user['course_willing_to_study'], 1);
//             $pdf->Cell(70, 30, $user['student_email'], 1);
//             $pdf->Ln();
//         }

//         // Output the PDF as a response
//         // header('Content-Type: application/pdf');
//         // header('Content-Disposition: inline; filename="user_report.pdf"');
//         // $pdf->Output();
//         $filePath = __DIR__ . '/Reports/Student_Report_' . $studentName . $studentUniqueId .'.pdf';
//         //echo "FilePath ".$filePath." ".$studentName;
//         $pdf->Output('F', $filePath); // Save PDF to a file
        
//         // 2. Send Email
//          $mail = new PHPMailer(true);
    
//         // try {
//             // SMTP Configuration
//             //$mail->isSMTP();
//           // $mail = new PHPMailer;
//     try{
// //Tell PHPMailer to use SMTP
//         $mail->isSMTP();
// //Enable SMTP debugging
// // 0 = off (for production use)
// // 1 = client messages
// // 2 = client and server messages
//        // $mail->SMTPDebug = 2;
// //Set the hostname of the mail server
//         $mail->Host = 'smtp.gmail.com';
// // use
// // $mail->Host = gethostbyname('smtp.gmail.com');
// // if your network does not support SMTP over IPv6
// //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
//         $mail->Port = 587;
// //Set the encryption system to use - ssl (deprecated) or tls
//         $mail->SMTPSecure = 'tls';
// //Whether to use SMTP authentication
//         $mail->SMTPAuth = true;
//         //Username to use for SMTP authentication - use full email address for gmail
//         $mail->Username = "travelsawari@gmail.com";
// //Password to use for SMTP authentication
//         $mail->Password = "ovhp qwgp cbqi pqpy"; //application password for the app named SAP
    
//             // Email Configuration
//             $mail->setFrom('travelsawari@gmail.com', 'Students Admission Point');
//             $mail->addAddress($studentEmail, $studentName); // Recipient's email and name
//             $mail->addAddress("travelsawari@gmail.com", $studentName); 
//             $mail->Subject = 'Submitted Application Form by'.$studentName;
//             $mail->Body = 'Please find the submitted report.';
//             $mail->AltBody = 'Please find the attached student report.';
    
//             // Attach the generated PDF
//             $mail->addAttachment($filePath);
    
//             $sending =  $mail->send();
            
//             // Send the email
//             if ($mail->send()) {
//                 return 'Email has been sent successfully.';
//             } else {
//                 echo 'Failed to send email. Error: ' . $mail->ErrorInfo;
//             }
    
//             // Cleanup: Delete the file after sending
//             if (file_exists($filePath)) {
//                 unlink($filePath);
//             }
//         } catch (Exception $e) {
//             echo 'Email could not be sent. Error: ', $mail->ErrorInfo;
//         }
//     }
//     catch (PDOException $e) {
//         echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
//     }
// }
    


?>