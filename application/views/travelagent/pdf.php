<html>
    <head>
        <title>Form</title>
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
        <h3 class="card-title" style="float: none; text-align: center;">DEPARTMENT OF TOURISM </h3>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT OF DADRA & NAGAR AND DAMAN & DIU </div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;margin-bottom: 20px;">Application Form for Registration of a Travel Agent</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;margin-bottom: 30px;margin-left: 500;">Dated : <?php echo convert_to_new_date_format($travelagent_data['submitted_datetime']); ?></div>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The Director,<br>
                Department of Tourism,<br>
                UT Administration of Dadra & Nagar Haveli and Daman & Diu.<br><br>
                <div style="font-size: 14px; margin-top: 10px;margin-left: 60px;word-spacing: 1px;font-weight: bold;">Subject: Request to issue the certificate of registration of travel agent. </div>
                <br>Respected Sir,
            </div>
        </div>
        <div style="font-size: 14px; margin-top: 10px;margin-left: 60px;word-spacing: 1px;">I, <div style="margin-left:  30px;margin-top: -18px;border-bottom: 1px solid black;width: 220px;text-align: center;"><?php echo $travelagent_data['name_of_person']; ?></div><div style="margin-left:  250px;margin-top: -18px;">,would like to kindly request you to issue the certificate of </div></div>
        <div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;">registration of Travel Agent under the Goa, Daman & Diu Registration of Tourist Trade Act 1982 </div>
        <div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;">to operate  as a travel agent. The details of my firm are as under :-</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">(a)</td>
                <td class="second-column">Name of the Travel Agency </td>
                <td class="third-column">
                    <?php echo $travelagent_data['name_of_travel_agency']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">(b)</td>
                <td class="second-column">Address of the Agency</td>
                <td class="third-column">
                    <?php echo $travelagent_data['address_of_agency']; ?><br>
                    <?php echo $travelagent_data['full_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">(c)</td>
                <td class="second-column">Area where the Travel agency is operating</td>
                <td class="third-column">
                    <?php echo $travelagent_data['area_of_agency']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">(d)</td>
                <td class="second-column">Fees</td>
                <td class="third-column">
                    <?php echo $travelagent_data['fees']; ?>
                </td>
            </tr>
        </table>
        <br />
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo TRAVELAGENT_DOC_PATH; ?><?php echo $travelagent_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
    </body>
</html>