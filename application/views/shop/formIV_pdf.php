<html>
    <head>
        <title>Form-IV</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 12px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
            }
            td.first-column{
                width: 6%;
                text-align: center;
            }
            td.second-column{
                width: 43%;
            }
            td.third-column{
                width: 43%;
            }
            td.table-first-column{
                width: 5.45%;
                text-align: center;
            }
            td.table-second-column{
                width: 25%;
            }
            td.table-third-column{
                width: 25%;
            }
            td.table-forth-column{
                width: 20%;
            }
            td.table-fifth-column{
                width: 25%;
            }
            td.single-second-column{
                width: 94%;
            }
            table.CompanyDetails td{
                height: 60px;
                padding: 3px;
            }
            td.declaration-number{
                border: none;
                width: 5%;
                vertical-align: text-top;
            }
            td.declaration{
                border: none;
                width: 100%;
            }
            td.border-none{
                border: none;
            }
        </style>
    </head>
    <body>
        <div style="font-size: 14px; text-align: center;font-weight: bold;">FORM-IV</div>
        <div style="text-align: center;font-weight: bold;">(See Rule-6)</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">RENEWAL OF REGISTRATION CERTIFICATE</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>

        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 40px;font-weight: bold;">CATEGORY OF ESTABLISHMENT &emsp; :<div style="margin-left: 320px;margin-top: -15px;"> <?php echo $shop_data['s_category']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 20px;font-weight: bold;">Name of Establishment &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;: <div style="margin-left: 320px;margin-top: -15px;"> <?php echo $shop_data['s_name']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;margin-top: 20px;">Address of the Establishment with  : <br>Mobile No. <div style="margin-left: 320px;margin-top: -38px;"> <?php echo $shop_data['s_door_no']; ?>,<?php echo $shop_data['s_street_name']; ?>,<?php echo $shop_data['s_location']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 0px;word-spacing: 10px;margin-top: 80px;font-weight: bold;">To,</div>
        <div style="font-size: 14px; text-align: left; word-spacing: 10px;font-weight: bold;">The Labour Inspector,</div>
        <div style="font-size: 14px; text-align: left; word-spacing: 10px;font-weight: bold;">Daman.</div>
        <div style="font-size: 14px; text-align: left; word-spacing: 10px;margin-top: 30px;font-weight: bold;">Sir,</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;margin-top: 40px;margin-left:50px;word-spacing: 65px;font-weight: bold;">At the period of Registration Certificate</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 7px;font-weight: bold;">No.<div style="border-bottom:1px solid;margin-left: 50px;margin-top: -20px;width:440px;">&nbsp;<?php echo $shop_data['s_registration_no']; ?></div><div style="margin-left: 500px;margin-top: -20px;">Originally granted /</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;font-weight: bold;">subsequently renewed to us has already expired on <div style="border-bottom:1px solid;margin-left: 440px;margin-top: -20px;width:145px;">&nbsp;<?php echo $shop_data['s_certificate_expiry_date']; ?></div><div style="margin-left: 595px;margin-top: -20px;">I / We,</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 16px;font-weight: bold;">therefore request your hounor to kindly renew the same. The original</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 16px;font-weight: bold;">Certificate is enclosed.</div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo PROJECT_PATH; ?>documents/shop/<?php echo $shop_data['s_sign_of_employer']; ?>" height="60px" width="90px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-top:20px;font-weight: bold;">SIGNATURE OF EMPLOYER WITH NAME</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;font-weight: bold;">DATE :</div>
        <div style="font-size: 14px; text-align: left; margin-top: 20px;margin-left:0px;word-spacing: 10px;font-weight: bold;">PLACE :</div>
    </body>
</html>