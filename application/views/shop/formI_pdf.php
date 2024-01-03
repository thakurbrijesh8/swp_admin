<html>
    <head>
        <title>Form-I</title>
        <style type="text/css">
            body {
                font-family: arial;
                font-size: 14px;
            }
            table.newTable, td {
                width: 80%;
                border: 1px solid #D3D3D3;
                border-collapse: collapse;
            }
            table.newTable1, td {
                width: 60%;
                border: 1px solid #D3D3D3;
                border-collapse: collapse;
            }
            td.new-column{
                width: 25%;
                text-align: center;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 0px solid black;
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
                height: 33px;
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
            /* DivTable.com */
            .divTable{
                display: table;
                width: 100%;
            }
            .divTableRow {
                display: table-row;
            }
            .divTableHeading {
                background-color: #EEE;
                display: table-header-group;
            }
            .divTableCell, .divTableHead {
                border: 1px solid #999999;
                display: table-cell;
                padding: 3px 10px;
            }
            .divTableHeading {
                background-color: #EEE;
                display: table-header-group;
                font-weight: bold;
            }
            .divTableFoot {
                background-color: #EEE;
                display: table-footer-group;
                font-weight: bold;
            }
            .divTableBody {
                display: table-row-group;
            }
        </style>
    </head>
    <body>
        <div style="font-size: 14px; text-align: center;font-weight: bold;"> FORM I </div>
        <div style="text-align: center;font-weight: bold;">(See Rule 3)</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;margin-bottom: 10px;font-weight: bold;">STATEMENT UNDER SECTION 3(1)</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Name of Shop/Establishment, if any :</td>
                <td class="third-column">
                    <?php echo $shop_data['s_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">Door No. and name of the Street and exact<br>Location of the Shop/Establishment and<br>Postal address </td>
                <td class="third-column">
                    <?php echo $shop_data['s_door_no']; ?><br>
                    <?php echo $shop_data['s_street_name']; ?><br>
                    <?php echo $shop_data['s_location']; ?><br>
                    <?php echo $shop_data['s_postal_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Exact location of office, Store-room, godown,<br>Warehouse or work place if any attached to<br>Shop but situated in premises different from<br>
                    Those of Shop/Establishment.</td>
                <td class="third-column">
                    <?php echo $shop_data['s_different_location_office']; ?><br>
                    <?php echo $shop_data['s_different_location_store_room']; ?><br>
                    <?php echo $shop_data['s_different_location_godown']; ?><br>
                    <?php echo $shop_data['s_different_location_warehouse']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Full name of the Employer, if any including<br>his father's name.</td>
                <td class="third-column">
                    <?php echo $shop_data['s_employer_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5.</td>
                <td class="second-column">Residential address of the Emplyer</td>
                <td class="third-column">
                    <?php echo $shop_data['s_employer_residential_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6.</td>
                <td class="second-column">Full name of Manager, if any including his<br>Father's name and his residential address</td>
                <td class="third-column">
                    <?php echo $shop_data['s_manager_name']; ?><br>
                    <?php echo $shop_data['s_manager_residential_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">7.</td>
                <td class="second-column">Name of Partners, if any including his Father's<br>name and his residential address (if a partner-<br>
                    Ship concerned)</td>
                <td class="third-column">
                    <?php
                    $partnerinfo = json_decode($shop_data['multiple_partner'], TRUE);
                    foreach ($partnerinfo as $value) {
                        echo $value['name'] . '<br>' . $value['address'] . '<br>';
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8.</td>
                <td class="second-column">Category of establishment i.e, whether a<br> Shop, Commercial Establishment, residential<br>
                    Hotel, restaurant, eating house, theatre, Cinema,<br> or other place or public amusement of<br> entertainment etc.</td>
                <td class="third-column">
                    <?php echo $shop_data['s_category']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9.</td>
                <td class="second-column">Nature of Business</td>
                <td class="third-column"> <?php echo $shop_data['s_nature_of_business']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10.</td>
                <td class="second-column"> Date of commencement of business </td>
                <td class="third-column"><?php echo convert_to_new_date_format($shop_data['s_commencement_of_business_date']); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">11.</td>
                <td class="second-column"> Names of members of employer's family<br>engaged in the Shop/Establishment. </td>
                <td class="third-column"></td>
            </tr>
        </table><br>

        <table class="newTable" border="1">
            <tr>
                <th>Name</th>
                <th>Relationship</th>
                <th>Gender</th>
                <th>Adults</th>
                <th>Young Person</th>
            </tr>
            <?php
            $familyinfo = json_decode($shop_data['s_employers_family_details'], TRUE);

            foreach ($familyinfo as $value) {
                if ($value['familyGender'] == VALUE_ONE) {
                    $gender = 'Male';
                } else
                if ($value['familyGender'] == VALUE_TWO) {
                    $gender = 'FeMale';
                }
                ?>
                <tr>
                    <td class="new-column"><?php echo $value['familyName']; ?></td>
                    <td class="new-column"><?php echo $value['familyRelationship']; ?></td>
                    <td class="new-column"><?php echo $gender; ?></td>
                    <td class="new-column"><?php
                        if ($value['familyAdult'] == VALUE_ONE) {
                            echo $adult = 'YES';
                        }
                        ?></td>
                    <td class="new-column"><?php
                        if ($value['familyYoungPerson'] == VALUE_ONE) {
                            echo $young = 'YES';
                        }
                        ?></td>
                </tr>
            <?php } ?>
        </table>

        <table class="CompanyDetails">
            <tr>
                <td class="first-column">12.</td>
                <td class="second-column">Name of other Employees : <br>(i) in a Managerial capacity<br>(ii) as Sweeper, Caretaker & traveling Staff.<br>(iii) As persons employed for loading & unloading of goods at godown.</td>
                <td class="third-column">
                </td>
            </tr>
            <tr>
                <td class="first-column">13.</td>
                <td class="second-column">Total numbers of employees :</td>
                <td class="third-column">
                </td>
            </tr>
        </table>
        <table class="newTable1" border="1" style="margin-top: 5px;margin-bottom: 5px;">
            <tr>
                <th>Name</th>
                <th>Managerial Capacity</th>
                <th>Type</th>
                <th>Godown Employed</th>
                <th>Gender</th>
                <th>Adults</th>
                <th>Young Person</th>
            </tr>
            <?php
            $employeeinfo = json_decode($shop_data['s_employees_details'], TRUE);

            foreach ($employeeinfo as $value) {
                if ($value['employeeGender'] == VALUE_ONE) {
                    $gender = 'Male';
                } else
                if ($value['employeeGender'] == VALUE_TWO) {
                    $gender = 'FeMale';
                }
                ?>
                <tr>
                    <td class="new-column"><?php echo $value['employeeName']; ?></td>
                    <td class="new-column"><?php echo $value['employeeManagerialCapacity']; ?></td>
                    <td class="new-column"><?php echo $value['employeeType']; ?></td>
                    <td class="new-column"><?php echo $value['employeeGodownEmployed']; ?></td>
                    <td class="new-column"><?php echo $gender; ?></td>
                    <td class="new-column"><?php
                        if ($value['employeeAdult'] == VALUE_ONE) {
                            echo $adult = 'YES';
                        }
                        ?></td>
                    <td class="new-column"><?php
                        if ($value['employeeYoungPerson'] == VALUE_ONE) {
                            echo $young = 'YES';
                        }
                        ?></td>
                </tr>
            <?php } ?>
        </table>
        <div style="margin-left: 0px;margin-top: -18px;">I hereby declare that the above information is true to the best of my knowledge and belief.</div>

        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo PROJECT_PATH; ?>documents/shop/<?php echo $shop_data['s_sign_of_employer']; ?>" height="60px" width="90px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Employer</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;word-spacing: 10px;margin-top: -20px;">Dated : <?php echo convert_to_new_date_format($shop_data['created_time']); ?></div>
    </body>
</html>
