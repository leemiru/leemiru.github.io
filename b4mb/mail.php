<?php

 $fromEmail = "j97770@naver.com";
 $fromName = "name";
 $toEmail = "email";
 $toName = "받는 사람의 이름";
 $subject = "이메일의 제목. ".date("Y-m-d H:i:s", time());
 $message = "<html><body>";
 $message .= "<p>보내고자 하는 이메일 내용을 HTML 로 구성하시면 됩니다.</p><br>";
 $message .= "<p>보내고자하는 내용을 이렇게 추가 하시면 됩니다. </p><br>";
 $message .= "</body></html>";
 $result = send_htmlmail($fromEmail, $fromName, $toEmail, $toName, $subject, $message);

 echo $result;


?>