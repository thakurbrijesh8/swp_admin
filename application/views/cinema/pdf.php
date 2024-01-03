<html>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 14px;
            }
            table.CompanyDetails, td {
                width: 100%;
                /*border: 1px solid black;*/
                border-collapse: collapse;
                word-spacing: 2px;
                margin-bottom: 0px;
            }
            table.newTable, td {
                width: 100%;
                /*border: 1px solid #D3D3D3;*/
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
                height: 35px;
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
        <div style="font-size: 14px; text-align: center; margin-top: 10px;text-decoration: underline;font-weight: bold;">Form (I)</div>
        <div style="font-size: 14px; text-align: center; margin-top: 5px;font-weight: bold;">(See rule 11)</div>
        <div style="font-size: 14px; text-align: center; margin-top: 5px;font-weight: bold;">Application of license under rule 11 of the Dadra and Nagar Haveli & Daman and Diu Cinema  <br>( Regulation of Exhibition by Video ) Rules, 1985.</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Name of applicant :</td>
                <td class="third-column">
                    <?php echo $cinema_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">Father's name :</td>
                <td class="third-column">
                    <?php echo $cinema_data['father_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Age :</td>
                <td class="third-column">
                    <?php echo $cinema_data['dob']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Address - Permanent :<br> &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Temporary  </td>
                <td class="third-column">
                    <?php echo $cinema_data['permanent_address']; ?><br>
                    <?php echo $cinema_data['temporary_address']; ?>
                </td>
            </tr>
        </table>
        <table style="margin-left: 12px;">
            <tr>
                <td class="declaration" >5. &emsp;Name of place and description where exhibition of film for public shall be made by the video<br> &emsp;&emsp;&nbsp;cassette Recorder :</td>
            </tr>
            <tr>
                <td class="declaration">6. &emsp;Documents referred to in rule 11 of the Dadra and Nagar Haveli & Daman and Diu Cinema <br> &emsp;&emsp;&nbsp;( Regulation of Exhibition by Video ) Rules 1985 namely :</td>
            </tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;(a) - In the case of a building</td>
            </tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;I. Please attach the site plan of the building as approved by the Mamlatdar in counsultation<br> &emsp;&emsp;&emsp;&emsp;with Associate Town
                    Planner, and give the names, places  and distance by public road of<br> &emsp;&emsp;&emsp;&emsp;the Proposed site to the nearest place of exhibition etc. Attached</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;&emsp;No such place within radious of 300 meters from the proposed Video house.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration" >&emsp;&emsp;&emsp;&emsp;1. Exhibition of film on Television, screen through Video cassette recorder.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration" >&emsp;&emsp;&emsp;&emsp;2. School, Collage etc.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration" >&emsp;&emsp;&emsp;&emsp;3. Hospital etc.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration" >&emsp;&emsp;&emsp;&emsp;4. Temples, Mosques, Church and other religious institution</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;II. Certificate of Chief of Police (regarding character of the license).</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;III. Photo-state copy of license obtained for the commercial use video/television under the &emsp;&emsp;&emsp;&emsp;&emsp;Indian Telegraph Act, 1885 (No. 13 of 1885).</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;IV. Documents showing the ownership or tenancy of the place</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;V. In the case of omnibus used as a contract carriage, a photo-state copy of the documents of &emsp;&emsp;&emsp;&emsp;&nbsp;its registration under the motor Vehicles Act, 1939.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">7. &emsp;If any other trade or business is located in the main premises where the video shows are to be &emsp;&emsp;&nbsp;exhibited :</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;I. Has license for such trade or business has been from the competent authority.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
            <tr>
                <td class="declaration">&emsp;&emsp;&emsp;II. Whether by conducting the Video exhibitions the trade or business for which the license has &emsp;&emsp;&emsp;&emsp;&nbsp;been granted is likely to be affected.</td>
            </tr>
            <tr>&emsp;</tr><tr>&emsp;</tr>
        </table>
        <table class="CompanyDetails"> 
            <tr>
                <td class="first-column">8.</td>
                <td class="second-column">Area in square of the</td>
            </tr>
            <tr>
                <td class="first-column">&nbsp;</td>
                <td class="second-column">I. Building : </td>
                <td class="third-column">
                    <?php echo $cinema_data['building_as']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column">&nbsp;</td>
                <td class="second-column">II. Auditorium :</td>
                <td class="third-column">
                    <?php echo $cinema_data['auditorium_as']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">&nbsp;</td>
                <td class="second-column">III. Passages and Gangways :</td>
                <td class="third-column">
                    <?php echo $cinema_data['passages_and_gangways_as']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">&nbsp;</td>
                <td class="second-column">IV. Urinals and W.C. :</td>
                <td class="third-column">
                    <?php echo $cinema_data['urinals_and_wc_as']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9.</td>
                <td class="second-column">Time schedule for exhibition of film  :</td>
                <td class="third-column">
                    <?php echo $cinema_data['time_schedule_film']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10.</td>
                <td class="second-column">Width of television screen / Video Scope Screen Setting arrangement in the building :</td>
                <td class="third-column">
                    <?php echo $cinema_data['screen_width']; ?>
                </td>
            </tr>
        </table>
        <br />

        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo CINEMA_DOC_PATH; ?><?php echo $cinema_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;font-weight: bold;">( Signature )</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;font-weight: bold;">Dadra and Nagar Haveli & Daman and Diu </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;font-weight: bold;">Date : </div>
    </body>
</html>