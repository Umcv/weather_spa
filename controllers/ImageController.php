<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

use app\models\Image;

class ImageController extends Controller
{
    public function beforeAction($action) { $this->enableCsrfValidation = false; return parent::beforeAction($action); }
    /**
     * Cteate weather image.
     *
     * @return string
     */
    public function actionIndex()
    {
        
        $val = json_decode(Yii::$app->request->post('val'), true);
        
        $model = new Image();
        return $model->create($val);
    }

    /**
     * Send weather image.
     *
     * @return string
     */
    public function actionShow() 
    {
        $id = Yii::$app->request->get('id');
        Yii::$app->response->format = Response::FORMAT_RAW;
        $model = new Image();
        $model->get($id);
    }

}
