<html>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 14px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
                margin-bottom: 0px;
            }
            table.newTable, td {
                width: 100%;
                border: 1px solid #D3D3D3;
                border-collapse: collapse;
            }
            td.new-column{
                width: 25%;
                text-align: center;
            }
            td.first-column{
                width: 5.1%;
                text-align: center;
            }
            td.common-first-column{
                width: 3.9%;
                text-align: center;
            }
            td.second-column{
                width: 39%;
            }
            td.common-second-column{
                width: 25%;
            }
            td.common-third-column{
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
                height: 50px;
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
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  290px;">From :-&nbsp;<div style="margin-left:  50px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  270px;">Address :-&nbsp;<div style="margin-left:  70px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  250px;">Contact No :-&nbsp;<div style="margin-left:  90px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  290px;">Date :-&nbsp;<div style="margin-left:  50px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;<?php echo convert_to_new_date_format($wc_data['created_time']); ?></div></div>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The Assistant Engineer,<br>
                P.W.D., Sub Division No. 1<br>
                Nani Daman.
            </div>
        </div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;text-decoration: underline;">Subject : Application for release of New Water Connection or Certificate of Non-Availability of Water</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Name :-</td>
                <td class="third-column">
                    <?php echo $wc_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">House No. :-</td>
                <td class="third-column">
                    <?php echo $wc_data['house_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Ward No. :-</td>
                <td class="third-column">
                    <?php echo $wc_data['ward_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Village :-</td>
                <td class="third-column">
                    <?php echo $wc_data['village']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5.</td>
                <td class="second-column">Panchayat/DMC :-</td>
                <td class="third-column">
                    <?php echo $wc_data['panchayat_or_dmc']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6</td>
                <td class="second-column">Connection (Old/New/Re-connection) :-</td>
                <td class="third-column">
                    <?php echo $wc_data['application_category']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7.</td>
                <td class="second-column">Receipt of last years House Tax<br> Payment (A Xerox copy to be enclosed) :-</td>
                <td class="third-column">
                    <?php echo 'Yes' ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8.</td>
                <td class="second-column">House Ownership :-</td>
                <td class="third-column">
                    <?php echo $wc_data['house_ownership']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">9.</td>
                <td class="second-column">Type of Water Connection or Certificate of Non-Availability of Water (Domestic/Non-domestic) :-</td>
                <td class="third-column">
                    <?php echo $wc_data['wc_type']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">10.</td>
                <td class="second-column">Diameter for service connection :-<br>
                </td>
                <td class="third-column"><br/>
                    <?php echo $wc_data['diameter_service_connection']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">11.</td>
                <td class="second-column">Water meter :-</td>
                <td class="third-column">
                    <?php echo $wc_data['water_meter']; ?>
                </td>
            </tr>
        </table>
        <br />
        <table style="margin-left: 20px;">
            <tr>
                <td class="declaration" style="text-align: center;text-decoration: underline;" >UNDERTAKING</td>
            </tr>
            <tr>
                <td class="declaration" >I hereby give undertaking that the above information furnished by me are correct and true.</td>
            </tr>
        </table>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo WC_DOC_PATH; ?><?php echo $wc_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 5px;text-decoration: underline;">FOR OFFICE USE</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">1. Security  Deposite <div style="margin-left:  300px;margin-top: -20px;">: Rs.</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">2. Service connection charge <div style="margin-left:  300px;margin-top: -20px;">: Rs.</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">3. Water meter fixing & Testing charge <div style="margin-left:  300px;margin-top: -20px;">: Rs.</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">4. Re-connection charge <div style="margin-left:  300px;margin-top: -20px;">: Rs.</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">5. Disconnection charge <div style="margin-left:  300px;margin-top: -20px;">: Rs.</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">6. Change of Name <div style="margin-left:  300px;margin-top: -20px;">: Rs.</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  230px;">Total Rs. &nbsp;&nbsp;:<div style="margin-left:  80px;margin-top: -20px;border-bottom: 2px solid black;border-top: 2px solid black;width: 80px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left:  50px;">Junior Engineer,<br>P.W.D., Sub Division No.1,<br>Nani Daman.</div>
        <div style="font-size: 14px; text-align: left; margin-top: -50px;margin-left:  450px;">Assistant Engineer,<br>P.W.D., Sub Division No.1,<br>Nani Daman.</div>
    </body>
</html>