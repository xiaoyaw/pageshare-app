<?php 

	function getfiles($path){ 
		$liv_data=array();
		foreach(scandir($path) as $afile){
			if($afile=='.'||$afile=='..') continue; 
			if(is_dir($path.'/'.$afile)) { 
				getfiles($path.'/'.$afile); 
			} else { 
				$item=array("sourceName"=>$afile,"sourcePic"=>getfirstpic($afile));
				array_push($liv_data, $item);
			} 
		} 
		echo json_encode($liv_data);
	} //简单的demo,列出当前目录下所有的文件


	getfiles("../../../liv");

	function getfirstpic($path){
		$file=fopen("../../../liv/".$path,"r");
		$line=fgets($file);
		$pic="data:image/png;base64,".explode("!!##image##!!", $line)[1];
		fclose($file);
		return $pic;
	}

 ?>