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
                border: none;
                border-collapse: collapse;
                word-spacing: 2px;
                margin-bottom: 0px;
            }
            table.newTable, td {
                width: 100%;
                border: none;
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
        <h3 class="card-title" style="float: none; text-align: center;">ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU </h3>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DEPARTMENT OF LABOUR </div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;margin-bottom: 20px;">Inter State Migrant Workers Renewal Form</div>
        <div class="row">
        </div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">License registration no. -</td>
                <td class="third-column">
                    <?php echo $migrantworkers_renewal_data['registration_number']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">Name of the Establishment –</td>
                <td class="third-column">
                    <?php echo $migrantworkers_renewal_data['name_of_establishment']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Location of Establishment –</td>
                <td class="third-column">
                    <?php echo $migrantworkers_renewal_data['location_of_establishment']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Name of Principal Employer -</td>
                <td class="third-column">
                       <?php echo $migrantworkers_renewal_data['principal_employer_name']; ?><br>
                </td>
            </tr>
            <tr>
                <td class="first-column">5.</td>
                <td class="second-column">Address of Principal Employer -</td>
                <td class="third-column">
                       <?php echo $migrantworkers_renewal_data['principal_employer_address']; ?><br>
                </td>
            </tr>
        </table>
        <br />
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo MIGRANTWORKERS_DOC_PATH; ?><?php echo $migrantworkers_renewal_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
    </body>
</html>