<html>
    <head>
        <title>Boiler Registration</title>
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
        <div style="font-size: 14px; text-align: center;">Boiler Registration Application - New</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name Of Owner:</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['owner_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Situation of Boiler:</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['situation_of_boiler']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Boiler Type:</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['boiler_type']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">District:</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['district']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">U. T.:</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['ut']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6</td>
                <td class="second-column">Working Pressure Of Boiler (kg/cm2):</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['working_pressure']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7</td>
                <td class="second-column">Max Pressure Approved (Kg/cm2):</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['max_pressure']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8</td>
                <td class="second-column">Heating Surface Area / Boiler Rating (m2)</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['heating_surface_area']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">9</td>
                <td class="second-column">Total Length of steam Pipes (in meters)</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['length_of_pipes']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">10</td>
                <td class="second-column">Maximum Continuous Evaporation</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['max_evaporation']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">11</td>
                <td class="second-column">Place Of Manufacture</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['place_of_manufacture']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">12</td>
                <td class="second-column">Year Of Manufacture</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['year_of_manufacture']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">13</td>
                <td class="second-column">Name Of Manufacture</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['name_of_manufacture']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">14</td>
                <td class="second-column">Manufacture Address</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['manufacture_address']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">15</td>
                <td class="second-column">Hydraulically Tested On</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['hydraulically_tested_on']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">16</td>
                <td class="second-column">Hydraulically Tested To</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['hydraulically_tested_to']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">17</td>
                <td class="second-column">Repairs</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['repairs']; ?>
                </td>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">18</td>
                <td class="second-column">Remarks</td>
                <td class="third-column">
                    <?php echo $boileract_renewal_data['remarks']; ?>
                </td>
                </td>
            </tr>
            <!-- <tr>
                <td class="first-column" style="height: 30px;">19</td>
                <td class="second-column">Application on Company Letter head</td>
                <td class="third-column"><a href ="<?php //echo BOILER_DOC_PATH; ?><?php //echo $boileract_renewal_data['company_letter_head']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">20</td>
                <td class="second-column">Fees as per the schedule</td>
                <td class="third-column"><a href ="<?php //echo BOILER_DOC_PATH; ?><?php //echo $boileract_renewal_data['copy_of_challan']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">21</td>
                <td class="second-column">A copy of last Boiler License</td>
                <td class="third-column"><a href ="<?php //echo BOILER_DOC_PATH; ?><?php //echo $boileract_renewal_data['last_boiler_license']; ?>" target="_blank"> View Document </a>
                </td>
            </tr> -->
    </table>
    <br />
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo BOILER_DOC_PATH; ?><?php echo $boileract_renewal_data['sign_of_applicant']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Signature of Applicant</td></tr>
    </table>
</body>
</html>