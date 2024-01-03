<html>
    <head>
        <title>Form</title>
        <style type="text/css">
            table.CompanyDetails {
                width: 100%;
                word-spacing: 2px;
                margin-left: 50px;
            }
            td.first-column{
                width: 5.1%;
                text-align: center;
                word-spacing: 5px;
            }
            td.second-column{
                width: 39%;
                word-spacing: 10px;
            }
            td.third-column{
                width: 43%;
            }
            table.CompanyDetails td{
                height: 60px;
                padding: 3px;
            }
            td.border-none{
                border: none;
            }
        </style>
    </head>
    <body>
        <h3 class="card-title" style="float: none; text-align: center;">ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU </h3>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DEPARTMENT OF LABOUR </div>
        <div class="row">
        </div>
        <br/>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FORM - IV</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See Rule 6)</div>
        <div style="font-size: 16px; text-align: center; margin-top: 10px;font-weight: bold;">RENEWAL FORM</div>
        <div class="row">
        </div>
        <br/>

        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 30px;">CATEGORY OF ESTABLISHMENT <div style="margin-left:  300px;margin-top: -20px;">: <?php echo $shop_renewal_data['category']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 30px;">Total number of employees <div style="margin-left:  300px;margin-top: -20px;">:  <?php echo $shop_renewal_data['total_employees']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 30px;">Name & Address of the <br>Establishment with Mobile Number <div style="margin-left:  300px;margin-top: -20px;">:  <?php echo $shop_renewal_data['name_of_shop']; ?><br>
                <?php echo $shop_renewal_data['employer_residential_address']; ?><br>
                <?php echo $shop_renewal_data['employer_mobile_no']; ?><br></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 0px;margin-left: 30px;">TO,</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 0px;margin-left: 30px;">The Labour Inspector,</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 0px;margin-left: 30px;"><?php echo $shop_renewal_data['district']; ?></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 30px;">Sir,</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 50px;margin-left: 80px;word-spacing: 5px;">At the period of Registration Certificate No. <div style="text-align: center;margin-left:  330px;margin-top: -20px;border-bottom: 1px solid black;width: 280px;"> <?php echo $shop_renewal_data['registration_number']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 50px;word-spacing: 9px;">Originally granted / subsequently renewed to us has been already been expired on </div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 0px;margin-top: 20px;margin-left: 50px;word-spacing: 5px;border-bottom: 1px solid black;width: 150px;"><?php echo $shop_renewal_data['valid_upto'] != '0000-00-00' ? convert_to_new_date_format($shop_renewal_data['valid_upto']) : '-----------'; ?></div><div style="margin-left:  200px;margin-top: -18px;">. I / We, therefore request your honour to kindly renew the same. The</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 25px;margin-top: 20px;margin-left: 50px;word-spacing: 9px;">Original Certificate is encosed. </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 50px;word-spacing: 9px;">Date : <?php echo convert_to_new_date_format($shop_renewal_data['submitted_datetime']); ?></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;margin-left: 50px;word-spacing: 9px;">Place : <?php echo $shop_renewal_data['district']; ?></div>
        <br />
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;margin-right: 40px;"><img src="<?php echo SHOP_DOC_PATH; ?><?php echo $shop_renewal_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-right: 20px;font-weight: bold;word-spacing: 5px;">SIGNATURE OF EMPLOYER WITH NAME</div>
s    </body>
</html>