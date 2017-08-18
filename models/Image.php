<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * Image is the model for create and show weather png image
 */
class Image extends Model
{

	public function create($val)
    {
		
        $diagramWidth = 400;
        $diagramHeight = 366;
        $tblOffcet = 155;
        $arrTitleText = ['Wind', 'Cloudiness', 'Pressure', 'Humidity', 'Sunrise', 'Sunset', 'Geo coords', ''];
        $arrValueText = [$val['windSpeed'].' m/s, '.$val['windDeg'].' °', $val['cloudiness'], $val['pressure'].' hpa', $val['humidity'].' %', $val['sunrise'], $val['sunset'], '['.$val['lat'].', '.$val['lon'].']', ''];

        $image = imageCreate($diagramWidth, $diagramHeight);
        $colorBackgr = imageColorAllocate($image, 221, 221, 221);
        $colorGrid         = imageColorAllocate($image, 187, 187, 187);
        $colorText        = imageColorAllocate($image, 0, 0, 0); 
        $fontTitle = './font/oswald/Oswald-Bold.ttf';
        $fontText = './font/oswald/Oswald-Medium.ttf';

        imageFilledRectangle($image, 0, 0, $diagramWidth - 1, $diagramHeight - 1, $colorBackgr); 
        imagefttext($image, 20, 0, 10, 35, $colorText, $fontTitle, "Weather in ".$val['name'].', '.$val['country']);

        $src_im = imagecreatefrompng('http://openweathermap.org/img/w/'.$val['icon'].'.png');
        imagecopy($image, $src_im, 10, 40, 0, 0, 50, 50);
        imagefttext($image, 24, 0, 70, 75, $colorText, $fontTitle, $val['temp']." °C");
        imagefttext($image, 14, 0, 10, 110, $colorText, $fontText, $val['description']);
        imagefttext($image, 14, 0, 10, 140, $colorText, $fontText, $val['date']);

        for ($i = 0; $i < 8; $i++) {
           imageLine($image, 0, $tblOffcet+$i*30, $diagramWidth, $tblOffcet+$i*30, $colorGrid); 
           imagefttext($image, 12, 0, 15, $tblOffcet+$i*30+22, $colorText, $fontText, $arrTitleText[$i]);
           imagefttext($image, 12, 0, $diagramWidth/2+15, $tblOffcet+$i*30+22, $colorText, $fontText, $arrValueText[$i]);
        }

        imageLine($image, 0, $tblOffcet, 0, $diagramHeight, $colorGrid); 
        imageLine($image, $diagramWidth/2, $tblOffcet, $diagramWidth/2, $diagramHeight, $colorGrid); 
        imageLine($image, $diagramWidth-1, $tblOffcet, $diagramWidth-1, $diagramHeight, $colorGrid); 

        $id = mt_rand(1000000, 9999999);
        imagepng($image, './img/png/'.$id.'.png');
        imagedestroy($image);

        return '/image/'.$id;
	}

    public function get($id)
    {
        $name = './img/png/'.$id.'.png';

        if (file_exists($name))
        {
            if (ob_get_level()) ob_end_clean();
            header('Content-Description: File Transfer');
            header('Content-Type: image/png');
            header('Content-Disposition: attachment; filename='.$id.'.png');
            header('Content-Transfer-Encoding: binary');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: '.filesize($name));
            readfile($name); exit;
        }
    }
}
