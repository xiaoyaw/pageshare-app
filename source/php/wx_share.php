<?php
$appid = "wxe818778f16e4400d";
$appsecret = "0f96dfcb79cf259c66217b7af95e20fe";//��ȡopenid

//��ȡȫ��token
$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
$result = https_request($url);
$jsoninfo = json_decode($result, true);
$access_token = $jsoninfo["access_token"];//�ӷ���json����ж���openid

//��ȡticket
$url1 = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$access_token&type=jsapi";
$result1 = https_request($url1);
$jsoninfo1 = json_decode($result1, true);
$jsapi_ticket=$jsoninfo1["ticket"];

//��ȡ����ַ���
$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 $noncestr = "";
 for ($i = 0; $i < 16; $i++) {
      $noncestr .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    
//��ȡʱ��
$timestamp=time();

//��ȡurl
$urll= $_GET['urll'];

//ASCLL����
$string = "jsapi_ticket=$jsapi_ticket&noncestr=$noncestr&timestamp=$timestamp&url=$urll";

//ǩ��
$signature = sha1($string);

//�ͻ�ǰ��
echo $appid.":".$timestamp.":".$noncestr.":".$signature; 

 function https_request($url,$data = null){
  $curl = curl_init();   
  curl_setopt($curl, CURLOPT_URL, $url);   
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);   
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);    
  if (!empty($data)){    
  curl_setopt($curl, CURLOPT_POST, 1);  
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);   
  }    
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
  $output = curl_exec($curl);    
  curl_close($curl);    
  return $output;
 }