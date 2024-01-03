<html>
    <head>
        <title>Form-VII</title>
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
        <div style="font-size: 14px; text-align: center;">FORM - VII</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">[See Rule 29(2)]</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">APPLICATION FOR RENEWAL OF LICENCE</div>
        <br/>
        <div class="row">
            
        </div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name and Address of Contractor:</td>
                <td class="third-column">
                    <?php echo $aplicence_renewal_data['contractor_name']; ?><br/>
                    <?php echo $aplicence_renewal_data['contractor_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Mobile No. :</td>
                <td class="third-column">
                    <?php echo $aplicence_renewal_data['contractor_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">Email Id. :</td>
                <td class="third-column">
                    <?php echo $aplicence_renewal_data['contractor_contact']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Number and Date of the Licence:</td>
                <td class="third-column">
                    <?php echo $aplicence_renewal_data['no_of_certificate']; ?><br/>
                    <?php echo $aplicence_renewal_data['date_of_certificate']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Date of expiry of previous Licence:</td>
                <td class="third-column">
                    <?php echo $aplicence_renewal_data['expiry_date_of_prev_licence']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Wheather Licence of the Contractor was suspended or revoked:</td>
                <td class="third-column">
                    <?php echo $aplicence_renewal_data['licence_status']; ?>
                </td>
            </tr>
            
        </table>
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo APLICENCE_DOC_PATH; ?><?php echo $aplicence_renewal_data['signature']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Signature</td></tr>
        </table>
    
</body>
</html>