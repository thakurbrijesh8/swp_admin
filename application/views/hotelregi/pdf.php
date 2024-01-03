<html>
    <head>
        <title>Form-II</title>
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
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">UT OF DADRA & NAGAR and DAMAN & DIU </div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application Form for Registration of a Hotel Keeper</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">FORM-II</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">(See Rule 3)</div>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The Director,<br>
                Department of Tourism,<br>
                Dadra & Nagar Haveli and  Daman & Diu.<br><br><br>
                Sir,
            </div>
        </div>
        <div style="font-size: 14px; margin-top: 10px;margin-left: 60px;word-spacing: 5px;">I/We request that / I/we may be registered as a Hotel-Keeper and my/our Hotel</div>

        <?php if (strlen($hotelregi_data['full_address']) < 30) { ?>
            <div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;">Known as <div style="margin-left:  80px;margin-top: -18px;border-bottom: 1px solid black;width: 240px;text-align: center;"><?php echo $hotelregi_data['name_of_hotel']; ?></div><div style="margin-left:  320px;margin-top: -18px;">, situated at </div>
                <div style="margin-left:  410px;margin-top: -18px;border-bottom: 1px solid black;width: 170px;text-align: center;font-size: 11px;"><?php echo $hotelregi_data['full_address']; ?></div><div style="margin-left:  580px;margin-top: -18px;"> may be</div>
            <?php } else { ?>
                <div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;">Known as <div style="margin-left:  80px;margin-top: -18px;border-bottom: 1px solid black;width: 240px;text-align: center;"><?php echo $hotelregi_data['name_of_hotel']; ?></div><div style="margin-left:  320px;margin-top: -18px;">, situated at ___________________________________</div>
                    <div style="margin-left:  0px;margin-top: 15px;border-bottom: 1px solid black;width: 570px;text-align: center;font-size: 11px;"><?php echo $hotelregi_data['full_address']; ?></div><div style="margin-left:  580px;margin-top: -18px;"> may be</div>
                <?php } ?>
                <div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;">registered under the Goa, Daman and Diu Registration of Tourist Trade Act, 1982. The </div>
                <div style="font-size: 14px; margin-top: 10px;word-spacing: 5px;">other particulars of the hotel are as under :-</div>
                <br/>
                <table class="CompanyDetails">
                    <tr>
                        <td class="first-column">1.</td>
                        <td class="second-column">Name of Hotel </td>
                        <td class="third-column">
                            <?php echo $hotelregi_data['name_of_hotel']; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">2.</td>
                        <td class="second-column">Name of the person with full address of the site where the applicant intends to run the hotel or is being run </td>
                        <td class="third-column">
                            <?php echo $hotelregi_data['name_of_person']; ?><br>
                            <?php echo $hotelregi_data['full_address']; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">3.</td>
                        <td class="second-column">Name of the tourist area where the hotel is to be run or is being run</td>
                        <td class="third-column">
                            <?php echo $hotelregi_data['name_of_tourist_area']; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">4.</td>
                        <td class="second-column">Name of the Proprietor (s)</td>
                        <td class="third-column">
                            <?php echo $hotelregi_data['name_of_proprietor']; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">5.</td>
                        <td class="second-column">Name of the Manager with full permanent address </td>
                        <td class="third-column">
                            <?php echo $hotelregi_data['name_of_manager']; ?><br>
                            <?php echo $hotelregi_data['manager_permanent_address']; ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column" style="height: 30px;">6</td>
                        <td class="second-column">Name of the Agent/Agents/employee/ employees</td>
                        <td class="third-column">
                            <?php
                            $agentinfo = json_decode($hotelregi_data['name_of_agent'], TRUE);
                            $i = 1;
                            foreach ($agentinfo as $value) {
                                echo $i++ . '. ' . $value['name'] . '<br>';
                            }
                            ?>

                        </td>
                    </tr>
                    <tr>
                        <td class="first-column" style="height: 30px;">7.</td>
                        <td class="second-column">Whether the applicant is a permanent resident of the Union Territory of Goa, Daman and Diu.</td>
                        <td class="third-column">
                            <?php
                            if ($hotelregi_data['permanent_resident_of_ut'] == IS_CHECKED_YES) {
                                echo "YES";
                            } else if ($hotelregi_data['permanent_resident_of_ut'] == IS_CHECKED_NO) {
                                echo "NO";
                            }
                            ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column" style="height: 30px;">8.</td>
                        <td class="second-column">Any other business which the applicant is carrying on in any tourist area in the Union Territory.</td>
                        <td class="third-column">
                            <?php
                            if ($hotelregi_data['other_business_of_applicant'] == IS_CHECKED_YES) {
                                echo "YES";
                            } else if ($hotelregi_data['other_business_of_applicant'] == IS_CHECKED_NO) {
                                echo "NO";
                            }
                            ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column" style="height: 30px;">9.</td>
                        <td class="second-column">Category of Hotel<br>
                        </td>
                        <td class="third-column"><br/>
                            <?php echo $hotelregi_data['category_of_hotel'] . ' Category'; ?><br/>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column" style="height: 30px;">10.</td>
                        <td class="second-column">Fees<br>
                        </td>
                        <td class="third-column"><br/>
                            <?php echo $hotelregi_data['fees']; ?><br/>
                        </td>
                    </tr>
                </table>
                <br />
                <table style="margin-left: 20px;">
                    <tr>
                        <td class="declaration" >The above information are true and correct to the best of my knowledge and belief. Therefore, you are requested to consider my application and grant me the required License.</td>
                    </tr>
                </table>
                <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo HOTELREGI_DOC_PATH; ?><?php echo $hotelregi_data['signature']; ?>" height="80px" width="80px"></div>
                <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">Place : <div style="margin-left:  40px;margin-top: -18px;">&emsp;<?php echo $hotelregi_data['name_of_tourist_area'];?></div></div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">Dated : <div style="margin-left:  40px;margin-top: -20px;">&emsp; <?php echo convert_to_new_date_format($hotelregi_data['submitted_datetime']); ?></div></div>
                <div style="font-size: 14px; text-align: center; margin-bottom: 5px;text-decoration: underline;margin-top: 180px;font-weight: bold;">C  H  E C  K    L  I  S  T</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 20px;">1. Application form duly filled.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">2. Site plan of land and approved plan of building and room layout.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">3. Copies of Form 1 & XIV of lands.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">4. Occupancy Certificate issued by DMC/District Panchayat.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">5. Sale Deed for purchase if any.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">6. N.O.C. issued by Station Fire Officer, Daman.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">7. N.O.C. issued by Dy. Director, Medical & Health Services, Daman.</div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">8. N.O.C. issued by concerned Panchayat / Municipality </div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">9. N.O.C.  from Electricity Department, Daman. </div>
                <div style="font-size: 14px; text-align: left; margin-bottom: 5px;">10. Police Verification Report of person intend to be register as Hotel Keeper.</div>
                </body>
                </html>