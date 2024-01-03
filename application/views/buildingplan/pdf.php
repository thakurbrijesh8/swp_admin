<html>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 12px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
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
        <div style="font-size: 14px; text-align: center;">Factory Building Plan Approval</div>
        <div style="text-align: center;">FORM 1</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Prescribed Under Rule 3</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name Of Applicant:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['applicant_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Phone No. Of Applicant:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['applicant_phoneno']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Email Of Applicant:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['email']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Full Address of Applicant:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['applicant_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Name Of Factory:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6</td>
                <td class="second-column">Factory Building:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_building']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7</td>
                <td class="second-column">Factory Street No./Sector:</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_streetno']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8</td>
                <td class="second-column">City</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_city']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">9</td>
                <td class="second-column">Pincode</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_pincode']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">10</td>
                <td class="second-column">District</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_district']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">11</td>
                <td class="second-column">Town / Village</td>
                <td class="third-column">
                    <?php echo $building_plan_data['factory_town']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">12</td>
                <td class="second-column">Nearest Police Station</td>
                <td class="third-column">
                    <?php echo $building_plan_data['nearest_police_station']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">13</td>
                <td class="second-column">Nearest Railway Station</td>
                <td class="third-column">
                    <?php echo $building_plan_data['nrearest_railway_station']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">14</td>
                <td class="second-column">Particulars Of Plant</td>
                <td class="third-column">
                    <?php echo $building_plan_data['particulars_of_plant']; ?>
                </td>
                </td>
            </tr>
            <!-- <tr>
                <td class="first-column" style="height: 30px;">15</td>
                <td class="second-column">Upload Flow Chart of the Manufacturing Process Supplemented by rief</td>
                <td class="third-column">
                    <a href ="<?php //echo BUILD_DOC_PATH; ?><?php //echo $building_plan_data['upload_flow_chart']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">16</td>
                <td class="second-column">Upload site Plan of Factory and immediate surroundings</td>
                <td class="third-column">
                    <a href ="<?php //echo BUILD_DOC_PATH; ?><?php //echo $building_plan_data['upload_site_plan']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">17</td>
                <td class="second-column">Upload Elevation Document</td>
                <td class="third-column">
                    <a href ="<?php //echo BUILD_DOC_PATH; ?><?php //echo $building_plan_data['upload_elevation_document']; ?>" target="_blank"> View Document </a>
                </td>
            </tr> -->
    </table>
    <br />
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo BUILD_DOC_PATH; ?><?php echo $building_plan_data['sign_of_applicant']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Signature of Applicant</td></tr>
    </table>
</body>
</html>