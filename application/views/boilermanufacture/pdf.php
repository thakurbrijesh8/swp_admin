<html>
    <head>
        <title>Boiler Manufacture</title>
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
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Questionnaires for recognition as manufacturer of Boiler & Boiler components</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name Of the firm:</td>
                <td class="third-column">
                    <?php echo $boilermanufactures_data['name_of_firm']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Address of the Workshop:</td>
                <td class="third-column">
                    <?php echo $boilermanufactures_data['address_of_workshop']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Address for Communication:</td>
                <td class="third-column">
                    <?php echo $boilermanufactures_data['address_of_communication']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Type of jobs executed by the firm earlier,With special Reference to their maximum Working pressure, temperature And the Materials involved:</td>
                <td class="third-column">
                    <?php echo $boilermanufactures_data['type_of_jobs']; ?>
                </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Whether having rectifier / generator, grinder,General tools And tackles, dye penetrant kit,Expander and measuring instruments or any Other tools and tackles NDT facilities, Heat Treatment etc:</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['tools_and_tackles']; ?>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">6</td>
            <td class="second-column">Whether the firm is prepared to execute the job Strictly in conformity with the IBR and maintain A high standard of work</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['standard_of_work']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">7</td>
            <td class="second-column">Whether the firm is prepared to accept full Responsibility for the work done and is prepared To clarify any controversial issue, If required ?</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['controversial_issue']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">8</td>
            <td class="second-column">Whether the firm has an internal quality control System of their own ?</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['is_internal_quality_control'] == '1' ? 'YES' : 'NO'; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;"></td>
            <td class="second-column">If so, give details</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['quality_control_detail']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">9</td>
            <td class="second-column">Details of power sanction</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['power_sanction']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">10</td>
            <td class="second-column">Whether the firm is conversant with the Boilers Act,1923 and Indian Boiler Regulation, 1950</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['conversant_with_boiler']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">11</td>
            <td class="second-column">Whether the aforesaid instruments are calibrated periodically</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['is_instruments_calibrated'] == '1' ? 'YES' : 'NO'; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;"></td>
            <td class="second-column">If so, give details</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['instruments_calibrate_detail']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">12</td>
            <td class="second-column">Details of Testing facilities available</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['testing_facility']; ?>
            </td>
            </td>
        </tr>
        <tr>
            <td class="first-column" style="height: 30px;">13</td>
            <td class="second-column">Whether the recording system of documents, data storing,Processing etc has been computerized with Internet</td>
            <td class="third-column">
                <?php echo $boilermanufactures_data['recording_system']; ?>
            </td>
            </td>
        </tr>
    </table>
    
    
    <br />
    <!-- <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo LABOURDDD_BASE_URL; ?>documents/boilermanufactures/<?php echo $boilermanufactures_data['boilermanufacture_id'] ?>/<?php echo $boilermanufactures_data['signature_and_seal']; ?>" height="100px" width="100px"></td></tr>
    </table> -->
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo BOILRMENUFACT_DOC_PATH; ?><?php echo 
        $boilermanufactures_data['signature_and_seal']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Signature & Seal</td></tr>
    </table>
</body>
</html>