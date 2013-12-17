<?php
function getExifCache($cache_path, $cache_file) {
	if(!file_exists($cache_path.$cache_file)) return false;
	require_once $cache_path.$cache_file;
	return $exif_data;
}

function setExifCache($cache_path, $cache_file, &$exif_data) {
	if(!$exif_data['make']) return false;
	unset($exif_data['Thumbnail']);
	$cache = '<?php if(!defined("__ZBXE__")) exit();'."\r\n";
	foreach($exif_data as $key => $val) {
		$cache .= "\$exif_data['".$key."'] = \"".$val."\";\r\n";
	}
	$cache .= '?>';
	if(!is_dir($cache_path)) FileHandler::makeDir($cache_path);
	FileHandler::writeFile($cache_path.$cache_file, $cache);
}

function getExifData($matche_img)
{
	// due to the error occurred when if the path includes blank
	$image_path = urldecode($matche_img[3]);

	// return if not exists
	if(!file_exists($image_path)) return;

	$file_ext = array_pop(explode('.', $image_path));
	if(strtolower($file_ext) != 'jpg') return $matche_img[0];

	// Retrieve information for caching
	$file_md5 = md5_file($image_path);
	$file_size = filesize($image_path);

	// The path to the cache directory
	$cache_path = './files/cache/addon_exif/';
	$cache_file = sprintf('%s_%s.cache.php', $file_size, $file_md5);

	unset($cache_exif_data);
	$cache_exif_data = &getExifCache($cache_path, $cache_file);

	if($cache_exif_data) {
		$exif_data = &$cache_exif_data;
	} else {
		require_once $addon_path.'phpexifrw/exifReader.php';

		$er = new phpExifReader($image_path);
		$exif_data = &$er->getImageInfo();
	}

	if(!$cache_exif_data) setExifCache($cache_path, $cache_file, $exif_data);
	$return_exif = &returnExifInfo($exif_data);

	return $matche_img[0].$return_exif;
}

/**
 * @brief This function returns image's EXIF information
 * @param string $image the path to the image file 
 * @return mixed image's EXIF information
 */
function returnExifInfo(&$exif_data) {
	$exif_info = array();
	if($exif_data['make']) array_push($exif_info,'<span class="exif_none"><b>제조사</b>'.$exif_data['make'].'</span>');
	if($exif_data['model']) array_push($exif_info,'<span><b>모델명</b>'.$exif_data['model'].'</span>');
	if($exif_data['software']) array_push($exif_info,'<span class="exif_none"><b>소프트웨어</b>'.substr($exif_data['software'],0,30).'</span>');
	if($exif_data['DateTime']) array_push($exif_info,'<span><b>촬영일자</b>'.$exif_data['DateTime'].'</span>');
	if($exif_data['artist']) array_push($exif_info,'<span class="exif_none"><b>만든이</b>'.$exif_data['artist'].'</span>');
	if($exif_data['exposureTime']) array_push($exif_info,'<span><b>노출시간</b>'.$exif_data['exposureTime'].'초</span>');
	if($exif_data['isoEquiv']) array_push($exif_info,'<span><b>감도(ISO)</b>'.$exif_data['isoEquiv'].'</span>');
	if($exif_data['fnumber']) array_push($exif_info,'<span><b>조리개 값</b>F/'.$exif_data['fnumber'].'</span>');
	if($exif_data['aperture']) array_push($exif_info,'<span class="exif_none"><b>조리개 최대개방</b>F/'.$exif_data['aperture'].'</span>');
	if($exif_data['exposureBias'] && $exif_data['exposureBias']!='+0.00') array_push($exif_info,'<span><b>노출보정</b>'.$exif_data['exposureBias'].' EV</span>');
	if($exif_data['exposure']) array_push($exif_info,'<span><b>촬영모드</b>'.$exif_data['exposure'].'</span>');
	if($exif_data['meteringMode']) array_push($exif_info,'<span><b>측광모드</b>'.$exif_data['meteringMode'].'</span>');
	if($exif_data['flashUsed']!=0)	array_push($exif_info,'<span><b>플래쉬</b>'.$exif_data['flashUsed'].'</span>');
	if($exif_data['focalLength']) array_push($exif_info,'<span><b>촛점거리</b>'.$exif_data['focalLength'].'mm</span>');
	if($exif_data['flength35mm']) array_push($exif_info,'<span class="exif_none"><b>35mm 환산</b>'.$exif_data['flength35mm'].'mm</span>');
	if($exif_data['lightSource'] && $exif_data['lightSource']!='기타') array_push($exif_info,'<span><b>화이트밸런스</b>'.$exif_data['lightSource'].'</span>');
	if($exif_data['resolution']) array_push($exif_info,'<span class="exif_size"><b>사진 크기</b>'.$exif_data['resolution'].'</span>');
	if($exif_data['GPSLongitude']) array_push($exif_info,'<span class="exif_gps" title="클릭하면 지도에 위치를 표시합니다"><sub title="'.$exif_data['GPSLatitudeUrl'].','.$exif_data['GPSLongitudeUrl'].'"></sub><span><b>GPS 위도</b>'.$exif_data['GPSLatitudeRef'].' '.$exif_data['GPSLatitude'].'</span><span><b>GPS 경도</b>'.$exif_data['GPSLongitudeRef'].' '.$exif_data['GPSLongitude'].'</span></span>');

	$return_exif = ($exif_info)?
'<span class="exif_addon">
<button onclick="jQuery(this).parent().toggleClass(\'on\')"><b title="사진의 정보를 봅니다">EXIF</b><span>X</span></button>
<strong>EXIF Viewer</strong>'
.implode($exif_info).
'</span>'
	:NULL;
	return $return_exif;
}
?>