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
                height: 40px;
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
            td.heading-line{
                width: 5.45%;
                height: 10px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h3 class="card-title" style="float: none; text-align: center;">DEPARTMENT OF LABOUR</h3>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT OF DADRA & NAGAR AND DAMAN & DIU </div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;margin-bottom: 20px;">Application of Inter-State Migrant Workers(ISMW) returnees who have returned to their Native/ Home State</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;margin-bottom: 20px;">Annexure-B</div>
        <div class="row">
<!--            <div class="form-group col-sm-6">
                To,<br>
                The Labour Inspector,<br>
            </div>-->
        </div>
        
        <table class="CompanyDetails">
            <tr>
                <td colspan="3">&emsp;Details of Migrant Workers</td>
            </tr>
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Name</td>
                <td class="third-column">
                    <?php echo $ismw_data['name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">DOB </td>
                <td class="third-column">
                    <?php echo convert_to_new_date_format($ismw_data['dob']); ?>&emsp;
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Gender </td>
                <td class="third-column">
                    <?php echo $ismw_data['gender']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Mobile No.</td>
                <td class="third-column">
                    <?php echo $ismw_data['mobile_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5.</td>
                <td class="second-column">Aadhaar No.  </td>
                <td class="third-column">
                    <?php echo $ismw_data['aadhaar_no']; ?>
                </td>
            </tr>
            <tr>
                <td colspan="3">&emsp;Permanent residential address (native address)</td>
            </tr>
            <tr>
                <td class="first-column">6.</td>
                <td class="second-column">State  </td>
                <td class="third-column">
                    <?php echo $ismw_data['p_state']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">7.</td>
                <td class="second-column">Dist  </td>
                <td class="third-column">
                    <?php echo $ismw_data['p_dist']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8.</td>
                <td class="second-column">Block/ Ward No  </td>
                <td class="third-column">
                    <?php echo $ismw_data['p_block_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9.</td>
                <td class="second-column">Village Locality  </td>
                <td class="third-column">
                    <?php echo $ismw_data['p_village']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10.</td>
                <td class="second-column">House No  </td>
                <td class="third-column">
                    <?php echo $ismw_data['p_house_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">11.</td>
                <td class="second-column">Pincode  </td>
                <td class="third-column">
                    <?php echo $ismw_data['p_pincode']; ?>
                </td>
            </tr>
            <tr>
                <td colspan="3">&emsp;Details of earlier employment</td>
            </tr>
            <tr>
                <td class="first-column">12.</td>
                <td class="second-column">State  </td>
                <td class="third-column">
                    <?php echo $ismw_data['ee_state']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">13.</td>
                <td class="second-column">Dist  </td>
                <td class="third-column">
                    <?php echo $ismw_data['ee_dist']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">14.</td>
                <td class="second-column">Occupation  </td>
                <td class="third-column">
                    <?php echo $ismw_data['ee_occuption']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">15.</td>
                <td class="second-column">Nature of employment (perm/temp/casual/contract/daily)  </td>
                <td class="third-column">
                    <?php echo $ismw_data['ee_nature']; ?>
                </td>
            </tr>
        </table>
        <br />
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 0px;word-spacing: 4px;font-weight: bold;">Note : Data to be maintained village-wise, block-wise and district-wise by the State/ UT at their end </div>
    </body>
</html>