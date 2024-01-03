<html>
    <head>
        <title>Form-XXIV</title>
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
        <div style="font-size: 14px; text-align: center;font-weight: bold;">FORM-XXIV</div>
        <div style="text-align: center;font-weight: bold;">(See rule 31 (3)(a))</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Notice of close day or a change in close day</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>

        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 40px;">Name of Shop/Eshtablishment &emsp;&emsp;:- <?php echo $shop_data['s_name']; ?><br>And address <div style="margin-left: 278px;margin-bottom:10px;"><?php echo $shop_data['s_door_no']; ?>,<?php echo $shop_data['s_street_name']; ?>,<?php echo $shop_data['s_location']; ?></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: -15px;word-spacing: 10px;">Registration No.&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; :- </div><div style="margin-left: 278px;"><?php echo $shop_data['s_registration_no']; ?></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;margin-top: 40px;margin-left:70px;word-spacing: 7px;">Notice is hereby given that with effect from (date) the Shop/Establishment</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 7px;">shall observe &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; day as closed day every week. It shall be the weekly</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;">holiday for all Employees.</div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo PROJECT_PATH; ?>documents/shop/<?php echo $shop_data['s_sign_of_employer']; ?>" height="60px" width="90px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;">Signature of Employer</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 0px;">To,</div>
        <div style="font-size: 14px; text-align: left; margin-top: 20px;margin-left:30px;word-spacing: 10px;">Inspector under the Goa, Daman and Diu </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 0px;margin-left:30px;word-spacing: 10px;">Shops and Establishments Act, 1973. </div>
    
    
        <div style="font-size: 14px; text-align: center;font-weight: bold;margin-top: 30px;">FORM-XXV</div>
        <div style="text-align: center;font-weight: bold;">(See rule 31 (3)(a))</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Notice of Shop/Establishment</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;font-weight: bold;">Close day</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 10px;"></div>

        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: 40px;">Name and address of Shop/Eshtablishment &emsp;&emsp;:- <?php echo $shop_data['s_name']; ?><div style="margin-left: 378px;"><?php echo $shop_data['s_door_no']; ?>,<?php echo $shop_data['s_street_name']; ?>,<?php echo $shop_data['s_location']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;margin-top: 40px;margin-left:70px;word-spacing: 7px;">This is to notify that our Shop/Establishment shall remain closed in every</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 7px;">week on ___________________________.</div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo PROJECT_PATH; ?>documents/shop/<?php echo $shop_data['s_sign_of_employer']; ?>" height="60px" width="90px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;">Signature of Employer</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 50px;word-spacing: 10px;margin-top: 0px;"></div>
        <div style="font-size: 14px; text-align: left; margin-top: 10px;margin-left:30px;word-spacing: 10px;">Approved </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 0px;margin-left:30px;word-spacing: 10px;">Inspector. </div>
    </body>
</html>