<?php

require_once 'db.php';
require_once 'vendor/slim/slim/Slim/Slim.php';
require_once 'fpdf/fpdf.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$app->get('/available_colleges', 'getAvailableColleges');
$app->get('/available_courses/:collegeName', 'getAvailableCourses');
$app->post('/post_application_form', 'saveApplicationDetails');
$app->post('/upload_documents', 'uploadDocuments');
$app->post('/post_annoucement', 'saveAnnouncementDetails');
$app->get('/get_annoucement', 'getAnnouncementDetails');
$app->get('/retrieve_document/:id', 'retrieveDocument');
$app->post('/upload_images', 'uploadImagesForSlider');
$app->post('/retrieve_slider_images', 'retrieveSliderImages')
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


function getAnnouncementDetails(){
    $sql = "SELECT * FROM noticeboard";
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

        if(!empty($data['header']) && !empty($data['notice'])){
            $header = $data['header'];
            $notice = $data['notice'];
         
    
            $sql = "INSERT INTO noticeboard(header, announcementdate, notice) VALUES (:header, NOW(), :notice)";
            try{
                $db = getDB2();
                $statement = $db->prepare($sql);
                $statement->bindParam(":header", $header);
                $statement->bindParam(":notice", $notice);
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

function saveApplicationDetails(){
    $app = \Slim\Slim::getInstance ();
    $json = $app->request->getBody();
    $arr = array ();

 
    if($json!=null){
        $data = json_decode($json, true);
    
       
        if(!empty($data['firstname']) && !empty($data['lastname']) && !empty($data['parent_first_name']) && !empty($data['parent_last_name'])
        && !empty($data['schoolName']) && !empty($data['twelfth_marks']) && !empty($data['madhyamik_marks']) && !empty($data['entrance_test_type']) 
        && !empty($data['enter_rank']) && !empty($data['street_address_1']) && !empty($data['street_address_2']) && !empty($data['city'])
        && !empty($data['state']) && !empty($data['pinCode']) && !empty($data['phoneNumber']) && !empty($data['course_willing_to_study'])
        && !empty($data['studentEmail'])){
            
        

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
        $studentEmail = $data['studentEmail'];

        $sql = "INSERT INTO ApplicationDetails(auto_student_id, stu_firstName, stu_lastName, parent_first_name, parent_last_name, schoolName, twelfth_marks, madhyamik_marks, entrance_test_type, student_rank, street_address_1, street_address_2, city, state, pinCode, phoneNumber, course_willing_to_study, student_email ) VALUES (:autoStudentId, :firstName, :lastName, :parent_first_name, :parent_last_name, :schoolName, :twelfth_marks, :madhyamik_marks, :entrance_test_type, :enter_rank, :street_address_1, :street_address_2, :city, :state, :pinCode, :phoneNumber, :course_willing_to_study, :student_email)";
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
            $statement ->bindParam(":student_email", $studentEmail);
            $statement->execute();
            //echo "4444 ".$auto_student_id; 
         $emailStatus = generatePdfReport($auto_student_id, $firstName, $studentEmail);

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

    $uploadedFile = $_FILES['file'];

    // Check for errors in the upload process
    if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['error' => 'Error during file upload']);
        return;
    }

    // Generate a unique file name
    $extension = pathinfo($uploadedFile['name'], PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // Generate a random name
    $filename = sprintf('%s.%s', $basename, $extension);

    // Move the file to the upload directory
    $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;
    if (move_uploaded_file($uploadedFile['tmp_name'], $targetPath)) {
        echo json_encode(['message' => 'File uploaded successfully', 'filename' => $filename]);
    } else {
        echo json_encode(['error' => 'Failed to move uploaded file']);
    }
    try{
    $db = getDB2();    
    $dummyStudent = "stu123762023";
    $filePath = $targetPath; 
    $stmt = $db->prepare("INSERT INTO SapDocuments(studentUniqueId,filePath, uploaded_at) VALUES (:studentUniqueId,:file_path, NOW())");
    $stmt->bindParam(':studentUniqueId', $dummyStudent);
    $stmt->bindParam(':file_path', $filePath);
    $stmt->execute();
    echo json_encode([
        'message' => 'File uploaded and saved to database successfully',
        'filename' => $filename,
        'file_path' => $filePath,
    ]);
    }
    catch (PDOException $e) {
        echo json_encode(['message' => 'File uploaded Failed'.$e->getMessage()]);
    }
}


function uploadImagesForSlider()
{
    // Directory to save uploaded files
    $directory = __DIR__ . '/SliderImages';

    if (!file_exists($directory)) {
        mkdir($directory, 0777, true); // Ensure the directory exists
    }

    // Check if files are uploaded
    if (!isset($_FILES['files'])) {
        echo json_encode(['error' => 'No files uploaded']);
        return;
    }

    $uploadedFiles = $_FILES['files'];
    $responses = []; // To store the response for each file

    for ($i = 0; $i < count($uploadedFiles['name']); $i++) {
        // Check for errors in each uploaded file
        if ($uploadedFiles['error'][$i] !== UPLOAD_ERR_OK) {
            $responses[] = ['error' => 'Error during file upload for file: ' . $uploadedFiles['name'][$i]];
            continue;
        }

        // Generate a unique file name
        $extension = pathinfo($uploadedFiles['name'][$i], PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8)); // Generate a random name
        $filename = sprintf('%s.%s', $basename, $extension);

        // Move the file to the upload directory
        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;
        if (move_uploaded_file($uploadedFiles['tmp_name'][$i], $targetPath)) {
            try {
                $db = getDB2();
                $filePath = $targetPath;

                // Insert file details into the database
                $stmt = $db->prepare("INSERT INTO SliderImagesUrls(filePath, uploaded_at) VALUES (:file_path, NOW())");
                $stmt->bindParam(':file_path', $filePath);
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
            $responses[] = ['error' => 'Failed to move uploaded file: ' . $uploadedFiles['name'][$i]];
        }
    }

    // Return the response for all files
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
    try {
        // Fetch data from the database
        $stmt = $db->prepare("SELECT * FROM ApplicationDetails WHERE auto_student_id = :autoStudentId");
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
        $pdf->SetFont('Arial', 'B', 16);

        // Add title
        $pdf->Cell(190, 10, 'Student Report', 0, 1, 'C');
        $pdf->Ln(10);

        // Define column headers and user values
        $fields = [
            'Unique Id' => $user['auto_student_id'],
            'First Name' => $user['stu_firstName'],
            'Last Name' => $user['stu_lastName'],
            'Parents First Name' => $user['parent_first_name'],
            'Parents Last Name' => $user['parent_last_name'],
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
            'Course Willing To Study' => $user['course_willing_to_study'],
            'Student Email' => $user['student_email']
        ];

        // Add table with headers and values
        $pdf->SetFont('Arial', 'B', 12);
        foreach ($fields as $header => $value) {
            $pdf->Cell(90, 10, $header, 1, 0); // Header cell
            $pdf->SetFont('Arial', '', 12);
            $pdf->Cell(100, 10, $value, 1, 1); // Value cell
            $pdf->SetFont('Arial', 'B', 12);
        }

        // Output the PDF as a file
        $filePath = __DIR__ . '/Reports/Student_Report_' . $studentName . $studentUniqueId . '.pdf';
        $pdf->Output('F', $filePath); // Save PDF to a file

        // Send Email with the PDF
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->SMTPSecure = 'tls';
            $mail->SMTPAuth = true;
            $mail->Username = "travelsawari@gmail.com";
            $mail->Password = "ovhp qwgp cbqi pqpy"; // Application password

            // Email Configuration
            $mail->setFrom('travelsawari@gmail.com', 'Students Admission Point');
            $mail->addAddress($studentEmail, $studentName);
            $mail->addAddress("travelsawari@gmail.com", $studentName);
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
    
    $sql = "SELECT * FROM `SliderImagesUrls` ORDER BY uploaded_at DESC LIMIT 5";
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