<?php
/**
 * ImageInfo 0.1.2 - A PHP library for reading image metadata.
 *
 * MIT License

	Copyright (c) 2010 M_FireFox

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

 *
 * @author	M_FireFox (quddnr145@naver.com)
 **/
class binary
{
	var $hexData = '';

	function binary($image_filename)
	{
		$s = file_get_contents($image_filename);
		$l = strlen($s);

		$dt = '';
		for ($i = 0; $i < $l; $i++)
		{
			$dt .= bin2hex($s[$i]);
		}

		$this->hexData = $dt;
	}

	// 해당 byte의 hexData return
	function getByteAt($byte)
	{
		$return = 0x00;
		eval('$return = 0x'.substr($this->hexData, $byte * 2, 2).';');
		return $return;
	}

	function getCharAt($iOffset)
	{
		return chr($this->getByteAt($iOffset));
	}

	function getStringAt($sByte, $eByte)
	{
		$return = '';
		for($i = 0; $i < $eByte; $i++)
		{
			$return .= $this->getCharAt($sByte + $i);
		}
		return $return;
	}

	function getSByteAt($iOffset)
	{
		$iByte = $this->getByteAt($iOffset);
		if ($iByte > 127) $iByte -= 256;
		return $iByte;
	}

	function getShortAt($iOffset, $bBig=false)
	{
		$iShort = $bBig ? ($this->getByteAt($iOffset) << 8) + $this->getByteAt($iOffset + 1) : ($this->getByteAt($iOffset + 1) << 8) + $this->getByteAt($iOffset);
		if ($iShort < 0) $iShort += 65536;
		return $iShort;
	}

	function getSShortAt($iOffset, $bBig=false)
	{
		$iUShort = $this->getShortAt($iOffset, $bBig);
		if ($iUShort > 32767) $iUShort -= 65536;
		return $iUShort;
	}

	function getLongAt($iOffset, $bBig=false)
	{
		$iByte1 = $this->getByteAt($iOffset);
		$iByte2 = $this->getByteAt($iOffset + 1);
		$iByte3 = $this->getByteAt($iOffset + 2);
		$iByte4 = $this->getByteAt($iOffset + 3);

		$iLong = $bBig ? ((((($iByte1 << 8) + $iByte2) << 8) + $iByte3) << 8) + $iByte4 : ((((($iByte4 << 8) + $iByte3) << 8) + $iByte2) << 8) + $iByte1;
		if ($iLong < 0) $iLong += 4294967296;
		return $iLong;
	}

	function getSLongAt($iOffset, $bBig=false)
	{
		$iULong = $this->getLongAt($iOffset, $bBig);
		if ($iULong > 2147483647) $iULong -= 4294967296;
		return $iULong;
	}

	function getLength()
	{
		return strlen($this->hexData);
	}

	// jpeg 판별
	function is_jpeg()
	{
		return $this->getByteAt(0) == 0xFF && $this->getByteAt(1) == 0xD8;
	}

	// gif 판별
	function is_gif()
	{
		return $this->getStringAt(0, 3) == 'GIF';
	}

	// png 판별
	function is_png()
	{
		return $this->getByteAt(0) == 0x89 && $this->getStringAt(1, 3) == 'PNG';
	}

	// bmp 판별
	function is_bmp()
	{
		return $this->getByteAt(0) == 0x42 && $this->getByteAt(1) == 0x4D;
	}

	// ico 판별
	function is_icon()
	{
		return $this->getByteAt(0) == 0x00 && $this->getByteAt(1) == 0x00;
	}
}

class exif extends binary
{
	var $debug = false;
	var $Tags = array(
			// version tags
			0x9000 => 'ExifVersion',				// EXIF version
			0xA000 => 'FlashpixVersion',			// Flashpix format version

			// colorspace tags
			0xA001 => 'ColorSpace',					// Color space information tag

			// image configuration
			0xA002 => 'PixelXDimension',			// Valid width of meaningful image
			0xA003 => 'PixelYDimension',			// Valid height of meaningful image
			0x9101 => 'ComponentsConfiguration',	// Information about channels
			0x9102 => 'CompressedBitsPerPixel',		// Compressed bits per pixel

			// user information
			0x927C => 'MakerNote',					// Any desired information written by the manufacturer
			0x9286 => 'UserComment',				// Comments by user

			// related file
			0xA004 => 'RelatedSoundFile',			// Name of related sound file

			// date and time
			0x9003 => 'DateTimeOriginal',			// Date and time when the original image was generated
			0x9004 => 'DateTimeDigitized',			// Date and time when the image was stored digitally
			0x9290 => 'SubsecTime',					// Fractions of seconds for DateTime
			0x9291 => 'SubsecTimeOriginal',			// Fractions of seconds for DateTimeOriginal
			0x9292 => 'SubsecTimeDigitized',		// Fractions of seconds for DateTimeDigitized

			// picture-taking conditions
			0x829A => 'ExposureTime',				// Exposure time (in seconds)
			0x829D => 'FNumber',					// F number
			0x8822 => 'ExposureProgram',			// Exposure program
			0x8824 => 'SpectralSensitivity',		// Spectral sensitivity
			0x8827 => 'ISOSpeedRatings',			// ISO speed rating
			0x8828 => 'OECF',						// Optoelectric conversion factor
			0x9201 => 'ShutterSpeedValue',			// Shutter speed
			0x9202 => 'ApertureValue',				// Lens aperture
			0x9203 => 'BrightnessValue',			// Value of brightness
			0x9204 => 'ExposureBias',				// Exposure bias
			0x9205 => 'MaxApertureValue',			// Smallest F number of lens
			0x9206 => 'SubjectDistance',			// Distance to subject in meters
			0x9207 => 'MeteringMode', 				// Metering mode
			0x9208 => 'LightSource',				// Kind of light source
			0x9209 => 'Flash',						// Flash status
			0x9214 => 'SubjectArea',				// Location and area of main subject
			0x920A => 'FocalLength',				// Focal length of the lens in mm
			0xA20B => 'FlashEnergy',				// Strobe energy in BCPS
			0xA20C => 'SpatialFrequencyResponse',	// 
			0xA20E => 'FocalPlaneXResolution', 		// Number of pixels in width direction per FocalPlaneResolutionUnit
			0xA20F => 'FocalPlaneYResolution',		// Number of pixels in height direction per FocalPlaneResolutionUnit
			0xA210 => 'FocalPlaneResolutionUnit', 	// Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
			0xA214 => 'SubjectLocation',			// Location of subject in image
			0xA215 => 'ExposureIndex',				// Exposure index selected on camera
			0xA217 => 'SensingMethod', 				// Image sensor type
			0xA300 => 'FileSource', 				// Image source (3 == DSC)
			0xA301 => 'SceneType', 					// Scene type (1 == directly photographed)
			0xA302 => 'CFAPattern',					// Color filter array geometric pattern
			0xA401 => 'CustomRendered',				// Special processing
			0xA402 => 'ExposureMode',				// Exposure mode
			0xA403 => 'WhiteBalance',				// 1 = auto white balance, 2 = manual
			0xA404 => 'DigitalZoomRation',			// Digital zoom ratio
			0xA405 => 'FocalLengthIn35mmFilm',		// Equivalent foacl length assuming 35mm film camera (in mm)
			0xA406 => 'SceneCaptureType',			// Type of scene
			0xA407 => 'GainControl',				// Degree of overall image gain adjustment
			0xA408 => 'Contrast',					// Direction of contrast processing applied by camera
			0xA409 => 'Saturation', 				// Direction of saturation processing applied by camera
			0xA40A => 'Sharpness',					// Direction of sharpness processing applied by camera
			0xA40B => 'DeviceSettingDescription',	// 
			0xA40C => 'SubjectDistanceRange',		// Distance to subject

			// other tags
			0xA005 => 'InteroperabilityIFDPointer',
			0xA420 => 'ImageUniqueID'				// Identifier assigned uniquely to each image
		);
	var $TiffTags = array(
			0x0100 => 'ImageWidth',
			0x0101 => 'ImageHeight',
			0x8769 => 'ExifIFDPointer',
			0x8825 => 'GPSInfoIFDPointer',
			0xA005 => 'InteroperabilityIFDPointer',
			0x0102 => 'BitsPerSample',
			0x0103 => 'Compression',
			0x0106 => 'PhotometricInterpretation',
			0x0112 => 'Orientation',
			0x0115 => 'SamplesPerPixel',
			0x011C => 'PlanarConfiguration',
			0x0212 => 'YCbCrSubSampling',
			0x0213 => 'YCbCrPositioning',
			0x011A => 'XResolution',
			0x011B => 'YResolution',
			0x0128 => 'ResolutionUnit',
			0x0111 => 'StripOffsets',
			0x0116 => 'RowsPerStrip',
			0x0117 => 'StripByteCounts',
			0x0201 => 'JPEGInterchangeFormat',
			0x0202 => 'JPEGInterchangeFormatLength',
			0x012D => 'TransferFunction',
			0x013E => 'WhitePoint',
			0x013F => 'PrimaryChromaticities',
			0x0211 => 'YCbCrCoefficients',
			0x0214 => 'ReferenceBlackWhite',
			0x0132 => 'DateTime',
			0x010E => 'ImageDescription',
			0x010F => 'Make',
			0x0110 => 'Model',
			0x0131 => 'Software',
			0x013B => 'Artist',
			0x8298 => 'Copyright'
		);
	var $GPSTags = array(
			0x0000 => 'GPSVersionID',
			0x0001 => 'GPSLatitudeRef',
			0x0002 => 'GPSLatitude',
			0x0003 => 'GPSLongitudeRef',
			0x0004 => 'GPSLongitude',
			0x0005 => 'GPSAltitudeRef',
			0x0006 => 'GPSAltitude',
			0x0007 => 'GPSTimeStamp',
			0x0008 => 'GPSSatellites',
			0x0009 => 'GPSStatus',
			0x000A => 'GPSMeasureMode',
			0x000B => 'GPSDOP',
			0x000C => 'GPSSpeedRef',
			0x000D => 'GPSSpeed',
			0x000E => 'GPSTrackRef',
			0x000F => 'GPSTrack',
			0x0010 => 'GPSImgDirectionRef',
			0x0011 => 'GPSImgDirection',
			0x0012 => 'GPSMapDatum',
			0x0013 => 'GPSDestLatitudeRef',
			0x0014 => 'GPSDestLatitude',
			0x0015 => 'GPSDestLongitudeRef',
			0x0016 => 'GPSDestLongitude',
			0x0017 => 'GPSDestBearingRef',
			0x0018 => 'GPSDestBearing',
			0x0019 => 'GPSDestDistanceRef',
			0x001A => 'GPSDestDistance',
			0x001B => 'GPSProcessingMethod',
			0x001C => 'GPSAreaInformation',
			0x001D => 'GPSDateStamp',
			0x001E => 'GPSDifferential'
		);
	var $StringValues = array();
	var $ko_StringValues = array(
			'ExposureProgram' => array(
				0 => '알 수 없음',
				1 => '수동',
				2 => '표준',
				3 => '조리개 우선',
				4 => '셔터 우선',
				5 => '창작 프로그램(필드의 깊이 중심)',
				6 => '동작 프로그램(셔터 속도 중심)',
				7 => '인물 모드',
				8 => '풍경 모드'
			),
			'MeteringMode' => array(
				0 => '알 수 없음',
				1 => '평균',
				2 => '중앙',
				3 => '지점(Spot)',
				4 => '다중지점(MultiSpot)',
				5 => '패턴',
				6 => '부분',
				255 => '기타'
			),
			'LightSource' => array(
				0 => '알 수 없음',
				1 => '햇빛',
				2 => '형광등',
				3 => '텅스텐(백열등)',
				4 => '플래시',
				9 => '맑은 날',
				10 => '흐린 날',
				11 => '그늘',
				12 => '주광색 형광등 (D 5700 - 7100K)',
				13 => '주백색 형광등 (N 4600 - 5400K)',
				14 => '냉백색 형광등 (W 3900 - 4500K)',
				15 => '백색 형광등 (WW 3200 - 3700K)',
				17 => '표준 광 A',
				18 => '표준 광 B',
				19 => '표준 광 C',
				20 => 'D55',
				21 => 'D65',
				22 => 'D75',
				23 => 'D50',
				24 => 'ISO studio tungsten',
				255 => '기타'
			),
			'Flash' => array(
				0x0000 => '플래시 끔',
				0x0001 => '플래시 켬',
				0x0005 => '섬광 반환하지 않는 플래시',
				0x0007 => '섬광 반환하는 플래시',
				0x0009 => '강제 플래시',
				0x000D => '섬광 반환하지 않는 강제 플래시',
				0x000F => '섬광 반환하는 강제 플래시',
				0x0010 => '강제 플래시 끔',
				0x0018 => '자동 플래시 끔',
				0x0019 => '자동 플래시',
				0x001D => '섬광 반환하지 않는 자동 플래시',
				0x001F => '섬광 반환하는 자동 플래시',
				0x0020 => '플래시 동작 안함',
				0x0041 => '적목 현상 플래시',
				0x0045 => '섬광 반환하지 않는 적목 현상 플래시',
				0x0047 => '섬광 반환하는 적목 현상 플래시',
				0x0049 => '적목 현상 강제 플래시',
				0x004D => '섬광 반환하지 않는 적목 현상 강제 플래시',
				0x004F => '섬광 반환하는 적목 현상 강제 플래시',
				0x0059 => '적목 현상 자동 플래시',
				0x005D => '섬광 반환하지 않는 적목 현상 자동 플래시',
				0x005F => '섬광 반환하는 적목 현상 자동 플래시'
			),
			'SensingMethod' => array(
				1 => 'Not defined',
				2 => 'One-chip color area sensor',
				3 => 'Two-chip color area sensor',
				4 => 'Three-chip color area sensor',
				5 => 'Color sequential area sensor',
				7 => 'Trilinear sensor',
				8 => 'Color sequential linear sensor'
			),
			'SceneCaptureType' => array(
				0 => '일반',
				1 => '풍경',
				2 => '인물',
				3 => '야간 인물/야경'
			),
			'SceneType' => array(
				1 => 'Directly photographed'
			),
			'CustomRendered' => array(
				0 => 'Normal process',
				1 => 'Custom process'
			),
			'WhiteBalance' => array(
				0 => '자동',
				1 => '수동'
			),
			'GainControl' => array(
				0 => 'None',
				1 => 'Low gain up',
				2 => 'High gain up',
				3 => 'Low gain down',
				4 => 'High gain down'
			),
			'Contrast' => array(
				0 => '보통',
				1 => '낮음',
				2 => '높음'
			),
			'Saturation' => array(
				0 => '보통',
				1 => '낮은 채도',
				2 => '높은 채도'
			),
			'Sharpness' => array(
				0 => '보통',
				1 => '낮음',
				2 => '높음'
			),
			'SubjectDistanceRange' => array(
				0 => '알 수 없음',
				1 => 'Macro',
				2 => 'Close view',
				3 => 'Distant view'
			),
			'FileSource' => array(
				1 => "필름 스캐너",
				2 => "Reflection Print Scanner",
				3 => "디지털 카메라"
			),
			'Components' => array(
				0 => '',
				1 => 'Y',
				2 => 'Cb',
				3 => 'Cr',
				4 => 'R',
				5 => 'G',
				6 => 'B'
			)
		);
	var $en_StringValues = array(
			'ExposureProgram' => array(
				0 => 'Not defined',
				1 => 'Manual',
				2 => 'Normal program',
				3 => 'Aperture priority',
				4 => 'Shutter priority',
				5 => 'Creative program',
				6 => 'Action program',
				7 => 'Portrait mode',
				8 => 'Landscape mode'
			),
			'MeteringMode' => array(
				0 => 'Unknown',
				1 => 'Average',
				2 => 'CenterWeightedAverage',
				3 => 'Spot',
				4 => 'MultiSpot',
				5 => 'Pattern',
				6 => 'Partial',
				255 => 'Other'
			),
			'LightSource' => array(
				0 => 'Unknown',
				1 => 'Daylight',
				2 => 'Fluorescent',
				3 => 'Tungsten (incandescent light)',
				4 => 'Flash',
				9 => 'Fine weather',
				10 => 'Cloudy weather',
				11 => 'Shade',
				12 => 'Daylight fluorescent (D 5700 - 7100K)',
				13 => 'Day white fluorescent (N 4600 - 5400K)',
				14 => 'Cool white fluorescent (W 3900 - 4500K)',
				15 => 'White fluorescent (WW 3200 - 3700K)',
				17 => 'Standard light A',
				18 => 'Standard light B',
				19 => 'Standard light C',
				20 => 'D55',
				21 => 'D65',
				22 => 'D75',
				23 => 'D50',
				24 => 'ISO studio tungsten',
				255 => 'Other'
			),
			'Flash' => array(
				0x0000 => 'Flash did not fire',
				0x0001 => 'Flash fired',
				0x0005 => 'Strobe return light not detected',
				0x0007 => 'Strobe return light detected',
				0x0009 => 'Flash fired, compulsory flash mode',
				0x000D => 'Flash fired, compulsory flash mode, return light not detected',
				0x000F => 'Flash fired, compulsory flash mode, return light detected',
				0x0010 => 'Flash did not fire, compulsory flash mode',
				0x0018 => 'Flash did not fire, auto mode',
				0x0019 => 'Flash fired, auto mode',
				0x001D => 'Flash fired, auto mode, return light not detected',
				0x001F => 'Flash fired, auto mode, return light detected',
				0x0020 => 'No flash function',
				0x0041 => 'Flash fired, red-eye reduction mode',
				0x0045 => 'Flash fired, red-eye reduction mode, return light not detected',
				0x0047 => 'Flash fired, red-eye reduction mode, return light detected',
				0x0049 => 'Flash fired, compulsory flash mode, red-eye reduction mode',
				0x004D => 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
				0x004F => 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
				0x0059 => 'Flash fired, auto mode, red-eye reduction mode',
				0x005D => 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
				0x005F => 'Flash fired, auto mode, return light detected, red-eye reduction mode'
			),
			'SensingMethod' => array(
				1 => 'Not defined',
				2 => 'One-chip color area sensor',
				3 => 'Two-chip color area sensor',
				4 => 'Three-chip color area sensor',
				5 => 'Color sequential area sensor',
				7 => 'Trilinear sensor',
				8 => 'Color sequential linear sensor'
			),
			'SceneCaptureType' => array(
				0 => 'Standard',
				1 => 'Landscape',
				2 => 'Portrait',
				3 => 'Night scene'
			),
			'SceneType' => array(
				1 => 'Directly photographed'
			),
			'CustomRendered' => array(
				0 => 'Normal process',
				1 => 'Custom process'
			),
			'WhiteBalance' => array(
				0 => 'Auto white balance',
				1 => 'Manual white balance'
			),
			'GainControl' => array(
				0 => 'None',
				1 => 'Low gain up',
				2 => 'High gain up',
				3 => 'Low gain down',
				4 => 'High gain down'
			),
			'Contrast' => array(
				0 => 'Normal',
				1 => 'Soft',
				2 => 'Hard'
			),
			'Saturation' => array(
				0 => 'Normal',
				1 => 'Low saturation',
				2 => 'High saturation'
			),
			'Sharpness' => array(
				0 => 'Normal',
				1 => 'Soft',
				2 => 'Hard'
			),
			'SubjectDistanceRange' => array(
				0 => 'Unknown',
				1 => 'Macro',
				2 => 'Close view',
				3 => 'Distant view'
			),
			'FileSource' => array(
				3 => 'DSC'
			),
			'Components' => array(
				0 => '',
				1 => 'Y',
				2 => 'Cb',
				3 => 'Cr',
				4 => 'R',
				5 => 'G',
				6 => 'B'
			)
		);

	// public
	function exif($path, $lang='ko', $debug = false)
	{
		$this->binary($path);
		$this->debug = $debug;

		// set string values
		$this->StringValues = $this->{$lang.'_StringValues'};
	}

	// private
	function readFromBinaryFile()
	{
		$aMarkers = array();

		if ($this->getByteAt(0) != 0xFF || $this->getByteAt(1) != 0xD8)
		{
			// not a valid jpeg
			return false;
		}

		$iOffset = 2;
		$iLength = $this->getLength();
		while ($iOffset < $iLength)
		{
			if ($this->getByteAt($iOffset) != 0xFF)
			{
				// not a valid marker, something is wrong
				if ($this->debug) echo 'Not a valid marker at offset '.$iOffset.', found: '.$this->getByteAt($iOffset).'<br />';
				return false;
			}

			$iMarker = $this->getByteAt($iOffset + 1);

			// Marker(0xFFE1) 부터 EXIF 데이터로 처리 한다
			// 0xFFE1 이외의 다른 Marker들을 이곳에서 처리한다.
			if ($iMarker == 22400)
			{
				if ($this->debug) echo 'Found 0xFFE1 marker<br />';
				return $this->readEXIFData($iOffset + 4, $this->getShortAt($iOffset + 2, true) - 2);
				$iOffset += 2 + $this->getShortAt($iOffset + 2, true);
			}
			else if ($iMarker == 225)
			{
				// 0xE1 : Application-specific 1
				if ($this->debug) echo 'Found 0xFFE1 marker<br />';
				return $this->readEXIFData($iOffset + 4, $this->getShortAt($iOffset + 2, true) - 2);
			}
			else
			{
				$iOffset += 2 + $this->getShortAt($iOffset + 2, true);
			}
		}
	}

	// private
	function readEXIFData($iStart, $iLength)
	{
		if ($this->getStringAt($iStart, 4) != 'Exif')
		{
			if ($this->debug) echo 'Not a valid EXIF data! '.$this->getStringAt($iStart, 4).'<br />';
			return false;
		}

		$bBigEnd = null;
		$iTIFFOffset = $iStart + 6;

		if ($this->getShortAt($iTIFFOffset) == 0x4949)
		{
			$bBigEnd = false;
		}
		else if ($this->getShortAt($iTIFFOffset) == 0x4D4D)
		{
			$bBigEnd = true;
		}
		else
		{
			if ($this->debug) echo 'Not valid TIFF data! (no 0x4949 or 0x4D4D)<br />';
			return false;
		}

		if ($this->getShortAt($iTIFFOffset + 2, $bBigEnd) != 0x002A)
		{
			if ($this->debug) echo 'Not a valid TIFF data! (no 0x002A)<br />';
			return false;
		}

		if ($this->getLongAt($iTIFFOffset + 4, $bBigEnd) != 0x00000008)
		{
			if ($this->debug) echo 'Not valid TIFF data! (First offset not 8) '.$this->getLongAt($iTIFFOffset + 4, $bBigEnd).'<br />';
			return false;
		}

		$oTags = $this->readTags($iTIFFOffset, $iTIFFOffset + 8, $this->TiffTags, $bBigEnd);
		if ($oTags['ExifIFDPointer'])
		{
			$oEXIFTags = $this->readTags($iTIFFOffset, $iTIFFOffset + $oTags['ExifIFDPointer'], $this->Tags, $bBigEnd);
			foreach ($oEXIFTags as $strTag=>$strValue)
			{
				switch ($strTag)
				{
					case 'LightSource':
					case 'Flash':
					case 'MeteringMode':
					case 'ExposureProgram':
					case 'SensingMethod':
					case 'SceneCaptureType':
					case 'SceneType':
					case 'CustomRendered':
					case 'WhiteBalance':
					case 'GainControl':
					case 'Contrast':
					case 'Saturation':
					case 'Sharpness':
					case 'SubjectDistanceRange':
					case 'FileSource':
						$oEXIFTags[$strTag] = $this->StringValues[$strTag][$oEXIFTags[$strTag]];
						break;

					case 'ExifVersion':
					case 'FlashpixVersion':
						$oEXIFTags[$strTag] = chr($oEXIFTags[$strTag][0]).chr($oEXIFTags[$strTag][1]).chr($oEXIFTags[$strTag][2]).chr($oEXIFTags[$strTag][3]);
						break;

					case 'ComponentsConfiguration':
						$oEXIFTags[$strTag]  = $this->StringValues['Components'][$oEXIFTags[$strTag][0]];
						$oEXIFTags[$strTag] .= $this->StringValues['Components'][$oEXIFTags[$strTag][1]];
						$oEXIFTags[$strTag] .= $this->StringValues['Components'][$oEXIFTags[$strTag][2]];
						$oEXIFTags[$strTag] .= $this->StringValues['Components'][$oEXIFTags[$strTag][3]];
						break;
				}
				$oTags[$strTag] = $oEXIFTags[$strTag];
			}
		}

		if ($oTags['GPSInfoIFDPointer'])
		{
			$oGPSTags = $this->readTags($iTIFFOffset, $iTIFFOffset + $oTags['GPSInfoIFDPointer'], $this->GPSTags, $bBigEnd);
			foreach ($oGPSTags as $strTag=>$strValue)
			{
				switch ($strTag)
				{
					case 'GPSVersionID':
						$oGPSTags[$strTag] = $oGPSTags[$strTag][0].'.'.$oGPSTags[$strTag][1].'.'.$oGPSTags[$strTag][2].'.'.$oGPSTags[$strTag][3];
						break;
				}
				$oTags[$strTag] = $oGPSTags[$strTag];
			}
		}

		return $oTags;
	}

	// private
	function readTags($iTIFFStart, $iDirStart, $oStrings, $bBigEnd)
	{
		$iEntries = $this->getShortAt($iDirStart, $bBigEnd);
		$oTags = null;
		for ($i = 0; $i < $iEntries; $i++)
		{
			$iEntryOffset = $iDirStart + $i * 12 + 2;
			$strTag = $oStrings[$this->getShortAt($iEntryOffset, $bBigEnd)];
			if (!$strTag && $this->debug) echo 'Unknown tag: '.$this->getShortAt($iEntryOffset, $bBigEnd).'<br />';
			$oTags[$strTag] = $this->readTagValue($iEntryOffset, $iTIFFStart, $iDirStart, $bBigEnd);
		}
		return $oTags;
	}

	// private
	function readTagValue($iEntryOffset, $iTIFFStart, $iDirStart, $bBigEnd)
	{
		$iType = $this->getShortAt($iEntryOffset + 2, $bBigEnd);
		$iNumValues = $this->getLongAt($iEntryOffset + 4, $bBigEnd);
		$iValueOffset = $this->getLongAt($iEntryOffset + 8, $bBigEnd) + $iTIFFStart;

		switch($iType)
		{
			case 1: // byte, 8-bit unsigned int
			case 7: // undefined 8-bit byte, value depending on field
				if ($iNumValues == 1)
				{
					return $this->getByteAt($iEntryOffset + 8, $bBigEnd);
				}
				else
				{
					$iValOffset = $iNumValues > 4 ? $iValueOffset : ($iEntryOffset + 8);
					$aVals = array();
					for ($n = 0; $n < $iNumValues; $n++)
					{
						$aVals[$n] = $this->getByteAt($iValOffset + $n);
					}
					return $aVals;
				}
				break;

			case 2: // ascii, 8-bit byte
				$iStringOffset = $iNumValues > 4 ? $iValueOffset : ($iEntryOffset + 8);
				return $this->getStringAt($iStringOffset, $iNumValues - 1);
				break;

			case 3: // short, 16 bit int
				if ($iNumValues == 1)
				{
					return $this->getShortAt($iEntryOffset + 8, $bBigEnd);
				}
				else
				{
					$iValOffset = $iNumValues > 2 ? $iValueOffset : ($iEntryOffset + 8);
					$aVals = array();
					for ($n = 0; $n < $iNumValues; $n++)
					{
						$aVals[$n] = $this->getShortAt($iValOffset + 2 * $n, $bBigEnd);
					}
					return $aVals;
				}
				break;

			case 4; // long, 32 bit int
				if ($iNumValues == 1)
				{
					return $this->getLongAt($iEntryOffset + 8, $bBigEnd);
				}
				else
				{
					$aVals = array();
					for ($n = 0; $n < $iNumValues; $n++)
					{
						$aVals[$n] = $this->getLongAt($iValueOffset + 4 * $n, $bBigEnd);
					}
					return $aVals;
				}
				break;
			case 5: // rational = two long values, first is numerator, second is denominator
				if ($iNumValues == 1)
				{
					return $this->getLongAt($iValueOffset, $bBigEnd) / $this->getLongAt($iValueOffset + 4, $bBigEnd);
				}
				else
				{
					$aVals = array();
					for ($n = 0; $n < $iNumValues; $n++)
					{
						$aVals[$n] = $this->getLongAt($iValueOffset + 8 * $n, $bBigEnd) / $this->getLongAt($iValueOffset + 4 + 8 * $n, $bBigEnd);
					}
					return $aVals;
				}
				break;
			case 9: // slong, 32 bit signed int
				if ($iNumValues == 1)
				{
					return $this->getSLongAt($iEntryOffset + 8, $bBigEnd);
				}
				else
				{
					$aVals = array();
					for ($n = 0; $n < $iNumValues; $n++)
					{
						$aVals[$n] = $this->getSLongAt($iEntryOffset + 4 * $n, $bBigEnd);
					}
					return $aVals;
				}
				break;
			case 10: // signed rational, two slongs, first is numerator, second is denominator
				if ($iNumValues == 1)
				{
					return $this->getSLongAt($iValueOffset, $bBigEnd) / $this->getSLongAt($iValueOffset + 4, $bBigEnd);
				}
				else
				{
					$aVals = array();
					for ($n = 0; $n < $iNumValues; $n++)
					{
						$aVals[$n] = $this->getSLongAt($iValueOffset + 8 * $n, $bBigEnd) / $this->getSLongAt($iValueOffset + 4 + 8 * $n, $bBigEnd);
					}
					return $aVals;
				}
				break;
		}
	}

	/**
	 * @brief	(public) 해당 이미지의 EXIF를 포함한 정보를 얻는 함수
	 * @return	array
	 **/
	function getImageInfo()
	{
		switch (true)
		{
			case $this->is_jpeg():
				return readJPEGInfo($this);
				break;
			case $this->is_gif():
				return readGIFInfo($this);
				break;
			case $this->is_png():
				return readPNGInfo($this);
				break;
			case $this->is_bmp():
				return readBMPInfo($this);
				break;
		}
	}
}

/**
 * @brief	PNG 이미지 정보 얻는 함수
 * @param	exif class object
 * @return	array
 **/
function readPNGInfo($exif)
{
	$w = $exif->getLongAt(16, true);
	$h = $exif->getLongAt(20, true);

	$bpc = $exif->getByteAt(24);
	$ct = $exif->getByteAt(25);
	$bpp = $bpc;
	if ($ct == 4) $bpp *= 2;
	if ($ct == 2) $bpp *= 3;
	if ($ct == 6) $bpp *= 4;

	$alpha = $exif->getByteAt(25) >= 4;
	return array(
			'format' => 'PNG',
			'version' => '',
			'width' => $w,
			'height' => $h,
			'bpp' => $bpp,
			'alpha' => $alpha,
			'exif' => array()
		);
}

/**
 * @brief	GIF 이미지 정보 얻는 함수
 * @param	exif class object
 * @return	array
 **/
function readGIFInfo($exif)
{
	$version = $exif->getStringAt(3, 3);
	$w = $exif->getShortAt(6);
	$h = $exif->getShortAt(8);

	$bpp = (($exif->getByteAt(10) >> 4) & 7) + 1;

	return array(
			'format' => 'GIF',
			'version' => $version,
			'width' => $w,
			'height' => $h,
			'bpp' => $bpp,
			'alpha' => false,
			'exif' => array()
		);
}

/**
 * @brief	JPEG 이미지 정보 얻는 함수
 * @param	exif class object
 * @return	array
 **/
function readJPEGInfo($exif)
{
	$w = 0;
	$h = 0;
	$comps = 0;
	$len = $exif->getLength();
	$offset = 2;
	while ($offset < $len)
	{
		$marker = $exif->getShortAt($offset, true);
		$offset += 2;
		if ($marker == 0xFFC0)
		{
			$h = $exif->getShortAt($offset + 3, true);
			$w = $exif->getShortAt($offset + 5, true);
			$comps = $exif->getByteAt($offset + 7);
			break;
		}
		else
		{
			$offset += $exif->getShortAt($offset, true);
		}
	}

	$exif_info = array();
	$exif_info = $exif->readFromBinaryFile();

	return array(
			'format' => 'JPEG',
			'version' => '',
			'width' => $w,
			'height' => $h,
			'bpp' => $comps * 8,
			'alpha' => false,
			'exif' => $exif_info
		);
}

/**
 * @brief	BMP 이미지 정보 얻는 함수
 * @param	exif class object
 * @return	array
 **/
function readBMPInfo($exif)
{
	$w = $exif->getLongAt(18);
	$h = $exif->getLongAt(22);
	$bpp = $exif->getShortAt(28);
	return array(
			'format' => 'BMP',
			'version' => '',
			'width' => $w,
			'height' => $h,
			'bpp' => $bpp,
			'alpha' => false,
			'exif' => array()
		);
}
?>
