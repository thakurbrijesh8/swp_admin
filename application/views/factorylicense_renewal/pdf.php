<html>
    <head>
        <title>Form-2</title>
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
        <div style="font-size: 14px; text-align: center;">FORM 3</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">(See Rule 6)</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Full name of factory:</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['name_of_factory']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column"> Full postal address and situation of factory:</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['factory_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column"> Full postal address to which communications should be carried (where the factory address serve the purpose of communication also this information need not be given):</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['factory_postal_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Maximum number of workers proposed to be employed on any one day during the year:</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['max_no_of_worker_year']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Installed (H.P.):</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['max_power_to_be_used']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Full name and residential address of the person who shall be the manager of the factory for the purpose of the Act:</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['manager_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">7 </td>
                <td class="second-column">Full name and residential address of the Occupier:</td>
                <td class="third-column">
                    <?php echo $factorylicense_renewal_data['occupier_detail']; ?>
                </td>
            </tr>
        </table>  
    <br />
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo FACTORY_DOC_PATH; ?><?php echo $factorylicense_renewal_data['sign_of_manager']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Signature of Manager</td></tr>
    </table>
    <br/>
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo FACTORY_DOC_PATH; ?><?php echo $factorylicense_renewal_data['sign_of_occupier']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Signature of Occupier</td></tr>
    </table>
</body>
</html>