<?php
function plus_count($url) {
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_HTTPHEADER      => array('Content-type: application/json'),
        CURLOPT_POST            => true,
        CURLOPT_POSTFIELDS      => '
        [{
            "method" : "pos.plusones.get",
            "id" : "p",
            "params" : {
                "nolog" : true,
                "id" : "'.$url.'",
                "source" : "widget",
                "userId" : "@viewer",
                "groupId" : "@self"
            },
            "jsonrpc" : "2.0",
            "key" : "p",
            "apiVersion" : "v1"
        }]',
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_SSL_VERIFYPEER  => false,
        CURLOPT_URL             => 'https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ'
    ));

    $res = curl_exec($ch);
    curl_close($ch);

    if ($res) {
        $json = json_decode($res, true);
        $arr  = array('counter' => $json[0]['result']['metadata']['globalCounts']['count']);

        return json_encode($arr);
    }
};

$url = $_GET['url'];
echo plus_count($url);