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
        <div style="font-size: 16px; text-align: center; margin-bottom: 12px;font-weight: bold;">SCHEDULE - 1</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 12px;">(See Rule 3) </div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 5px;">FORM OF APPLICATION UNDER SUB-SECTION (1) OF SECTION 32 OF</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 12px;">THE GOA, DAMAN AND DIU LAND REVENUE CODE - 1968.</div>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The Collector,<br>
                <?php echo $na_data['district']; ?>.<br>
                Sir,
            </div>
        </div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">I/We,&emsp;
            <?php
                            $applicantinfo = json_decode($na_data['multiple_applicant'], TRUE);
                            $i = 1;
                            foreach ($applicantinfo as $value) {
                                echo "<span style='font-weight: bold;'>".$value['name']."</span>, resident of &emsp;".$value['address']."<br>";
                            }
                            ?>
        </div>
        <!--<div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">I/We,<div style="font-size: 14px; text-align: center; margin-left: 10px;width: 150px;margin-top: -18px;font-weight: bold;word-spacing: 5px;"><?php echo $na_data['name_of_applicant']; ?></div><div style="font-size: 14px; text-align: center; margin-left: 230px;margin-top: -20px;word-spacing: 2px;width: 150px;">, <?php echo $na_data['postel_address']; ?>, Taluka  <?php echo $na_data['village']; ?> in  <?php echo $na_data['postel_address']; ?></div></div>-->
        <div style="font-size: 14px; text-align: left; margin-top: 15px;word-spacing: 5px;">do hereby apply for Permission to use the land described below which is:-</div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">a) Assessed or held for the purpose of agriculture for the non-agricultureal </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 60px;word-spacing: 5px;">&emsp;purpose/purposes of <span style="font-weight: bold;"><?php echo $na_data['agri_purpose_a']; ?></span></div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">b) Assessed or held for the non-agricultureal purpose of</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 60px;word-spacing: 5px;">&emsp;<span style="font-weight: bold;"><?php echo $na_data['non_agri_purpose_b']; ?> </span></div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">c) Assessed or held for the non-agricultural purpose of <span style="font-weight: bold;"><?php echo $na_data['non_agri_purpose_c']; ?> </span> for</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 60px;word-spacing: 5px;">&emsp;the same purpose but in relaxation of condition <span style="font-weight: bold;"><?php echo $na_data['rel_condition_c']; ?> </span></div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 60px;word-spacing: 5px;">&emsp;imposed at the time of grant of land or permission for such</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 60px;word-spacing: 5px;">&emsp;non-agricultural use viz.<span style="font-weight: bold;"><?php echo $na_data['pre_non_agri_c']; ?> </span></div>
        <div style="font-size: 16px; text-align: left; margin-top: 50px;margin-left: 0px;word-spacing: 5px;font-weight: bold;"> 2. I annex to this application :-</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">a)&emsp; A certified copy of record of rights in respect of the land as it existed at </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;the time of application (R/R Nakal, Form I & XIV and Site Plan).</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">b)&emsp; A Sketch or layout of the site in question showing the location of the proposed </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;building or other works for which permission is sought and the nearest road or</div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;means of access.(Irrevocable Declaration/Consent/NOC in form of affidavit</div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;of the holder of the plot from where access will be provided)  </div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">c)&emsp; Written consent of the tenant/superior holder/occupant and an affidavit of the </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;applicant stating that the access will be obtained from the land holder. </div>
        <div style="font-size: 16px; text-align: left; margin-left: 0px;word-spacing: 5px;font-weight: bold;margin-top: 370px;margin-bottom: 10px;"> 3. I also furnish the following information</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">3.1</td>
                <td class="second-column">Full Name of the applicant </td>
                <td class="third-column">
                    <?php echo $na_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.2</td>
                <td class="second-column">Full Postal address </td>
                <td class="third-column">
                    <?php echo $na_data['postel_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.3</td>
                <td class="second-column">Occupation</td>
                <td class="third-column">
                    <?php echo $na_data['occupation']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.4</td>
                <td class="second-column">Village Taluka and District where<br>the land is situated</td>
                <td class="third-column">
                    <?php echo $na_data['village']; ?><br>
                    <?php echo $na_data['district']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.5</td>
                <td class="second-column">Survey No. Hissa No. area and<br>assessment/rent of the land</td>
                <td class="third-column">
                    <?php echo $na_data['survey_no']; ?><br>
                    <?php echo $na_data['area_assessment']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.6</td>
                <td class="second-column">Area of the site of (5) above<br>proposed to be used for the
                    <br>1) Residential..............................
                    <br>2) Industrial...............................
                    <br>3) Commercial............................
                    <br>4) Residential-cum-Commercial.....
                    <br>5) Any other N.A. Purpose ...........
                    <br>(supported with write-up and sketch
                    <br>or lay-out showing land utilization
                    <br>details separately for each proposed
                    <br>purpose)</td>
                <td class="third-column">
                    <?php echo $na_data['area_of_site_used']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.7</td>
                <td class="second-column">Whether the applicant is occupant
                    <br>Class-I or Class-II or a tenant or a
                    <br>government lessee.</td>
                <td class="third-column">
                    <?php echo $na_data['occupant_class']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.8</td>
                <td class="second-column">Present use of the land whether any
                    <br>building exists thereon and if so its
                    <br>use.
                </td>
                <td class="third-column"><br/>
                    <?php echo $na_data['present_use_land']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.9</td>
                <td class="second-column">Whether the land is Situated or
                    <br>Included
                    <br>(a) In Municipal Area
                    <br>(b) In City Survey Area
                    <br>(c) In or near a cantonment area
                    <br>(d) Near a Air-port or a Rly. Station
                    <br>or a Jail or prison or local public
                    <br>office or cremation or burial ground.
                    <br>(e) Adjoining to nalla, creek, bank
                    <br>of river etc.
                    <br>If so, its approximate distance there
                    <br>from.
                </td>
                <td class="third-column">
                    <?php echo $na_data['situated_land']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.10</td>
                <td class="second-column">Whether electrical high transmission
                    <br>lines (or path way, road, canal,
                    <br>nalla) pass over/through the land
                    <br>and if so what is the distance
                    <br>thereof from the proposed building
                    <br>or other works.
                </td>
                <td class="third-column">
                    <?php echo $na_data['electrical_distance_land']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.11</td>
                <td class="second-column">Is the land under acquisitions if so,
                    <br>state details
                </td>
                <td class="third-column">
                    <?php echo $na_data['acquisition_under_land']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.12</td>
                <td class="second-column">Is there a road from where the land
                    <br>is easily accessible ? State the
                    <br>name of the road and whether it is
                    <br>Highway, Major district road or
                    <br>village road. What is the distance of
                    <br>the proposed building or other work
                    <br>from the centre of the road?
                </td>
                <td class="third-column">
                    <?php echo $na_data['accessible_land']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.13</td>
                <td class="second-column">If there is no road adjoining the
                    <br>land how is it proposed to provide
                    <br>for access to the site ?
                    <br>(Please refer point No. 2 (b)
                    <br>herebefore)
                </td>
                <td class="third-column">
                    <?php echo $na_data['site_access_land']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">3.14</td>
                <td class="second-column">Was a similar application made in
                    <br>the past for non-agricultural use of
                    <br>this land and was it rejected?
                    <br>If yes, Why ?
                </td>
                <td class="third-column">
                    <?php echo $na_data['rejected_land']; ?>
                </td>
            </tr>
        </table>
        <br />
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 50px;word-spacing: 10px;">I solemnly affirm that the information given above is true to the best of my</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;word-spacing: 10px;">knowledge and belief.</div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo NA_DOC_PATH; ?><?php echo $na_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;">Place: <?php echo $na_data['district']; ?> </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 20px;">Dated : <?php echo convert_to_new_date_format($na_data['submitted_datetime']); ?></div>
    </body>
</html>
<!--<html>
    <head>
        <title>Form-1</title>
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
        <div style="font-size: 16px; text-align: center; margin-bottom: 12px;font-weight: bold;">SCHEDULE - 1</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 12px;">(See Rule 3) </div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 5px;">FORM OF APPLICATION UNDER SUB-SECTION (1) OF SECTION 32 OF</div>
        <div style="font-size: 14px; text-align: center; margin-bottom: 12px;">THE GOA, DAMAN AND DIU LAND REVENUE CODE - 1968.</div>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The Collector,<br>
                <?php echo $na_data['district']; ?>.<br>
                Sir,
            </div>
        </div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">I/We,<div style="font-size: 14px; text-align: center; margin-left: 10px;width: 150px;margin-top: -18px;font-weight: bold;word-spacing: 5px;"><?php echo $na_data['name_of_applicant']; ?></div><div style="font-size: 14px; text-align: center; margin-left: 230px;margin-top: -20px;word-spacing: 2px;width: 150px;">, <?php echo $na_data['postel_address']; ?>, Taluka  <?php echo $na_data['village']; ?> in  <?php echo $na_data['postel_address']; ?></div></div>
        <div style="font-size: 14px; text-align: left; margin-top: 15px;word-spacing: 5px;">District hereby apply for Permission to use the land described below which is:-</div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 12px;">a)&emsp; Assessed or held for the purpose of agriculture for the non-agricultureal </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 12px;">&emsp;purpose/purposes for <span style="font-weight: bold;"><?php echo $na_data['purpose']; ?></span></div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 25px;">b) Assessed or held for the non-agricultureal purpose of</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 75px;word-spacing: 12px;">&emsp;_______________________________________________________ for the non-agricultural</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 75px;word-spacing: 20px;">&emsp;purpose/purposes for ___________________________________________________________.</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 25px;">c) Assessed or held for the non-agricultural purpose of </div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 75px;word-spacing: 12px;">&emsp;_______________________________________________________ for the same purpose but in </div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 75px;word-spacing: 20px;">&emsp;relaxation of condition ___________________________________________________________</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 75px;word-spacing: 20px;">&emsp;imposed at the time of grant of land or permission for such</div>
        <div style="font-size: 14px; text-align: left; margin-top: 0px;margin-left: 75px;word-spacing: 20px;">&emsp;non-agricultural use viz.________________________________________________</div>
        <div style="font-size: 16px; text-align: left; margin-top: 50px;margin-left: 0px;word-spacing: 5px;font-weight: bold;"> 2. I annex to this application :-</div>
        <div style="font-size: 13px; text-align: left; margin-top: 5px;margin-left: 50px;word-spacing: 5px;">(In 10 set i.e 1 Original + 9 Zerox copies)</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">a)&emsp; A certified copy of record of rights in respect of the land as it existed at </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;the time of application (R/R Nakal, Form I & XIV and Site Plan).</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">b)&emsp; A Sketch or layout of the site in question showing the location of the </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;proposed building or other works for which permission is sought and the</div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;nearest road or means of access.</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">c)&emsp; Declaration/Consent/NOC in form of affidavit of the holder of the plot </div>
        <div style="font-size: 14px; text-align: left; margin-top: 5px;margin-left: 75px;word-spacing: 5px;">&emsp;from where access will be provided.</div>
        <div style="font-size: 14px; text-align: left; margin-top: 25px;margin-left: 50px;word-spacing: 5px;">d)&emsp; Written consent of the tenant/superior holder/occupant. </div>
        <div style="font-size: 16px; text-align: left; margin-left: 0px;word-spacing: 5px;font-weight: bold;margin-top: 330px;margin-bottom: 10px;"> 3. I also furnish the following information</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Full Name of the applicant </td>
                <td class="third-column">
                    <?php echo $na_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">Full Postal address </td>
                <td class="third-column">
                    <?php echo $na_data['postel_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">Occupation</td>
                <td class="third-column">
                    <?php echo $na_data['occupation']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Village Taluka and District where<br>the land is situated</td>
                <td class="third-column">
                    <?php echo $na_data['village']; ?><br>
                    <?php echo $na_data['district']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">5.</td>
                <td class="second-column">Survey No. Hissa No. area and<br>assessment/rent of the land</td>
                <td class="third-column">
                    <?php echo $na_data['survey_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6.</td>
                <td class="second-column">Area of the site of (5) above<br>proposed to be used for the
                    <br>1) Residential..............................
                    <br>2) Industrial...............................
                    <br>3) Commercial............................
                    <br>4) Residential-cum-Commercial.....
                    <br>5) Any other N.A. Purpose ...........
                    <br>(supported with write-up and sketch
                    <br>or lay-out showing land utilization
                    <br>details separately for each proposed
                    <br>purpose)</td>
                <td class="third-column">
                    <?php echo $na_data['area_of_site_used']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7.</td>
                <td class="second-column">Whether the applicant is occupant
                    <br>Class-I or Class-II or a tenamt or a
                    <br>government lessee.</td>
                <td class="third-column">
                    <?php echo $na_data['occupant_class']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8.</td>
                <td class="second-column">Present use of the land whether any
                    <br>building exists thereon and if so its
                    <br>use.
                </td>
                <td class="third-column"><br/>
                    <?php echo $na_data['present_use_land']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">9.</td>
                <td class="second-column">Whether the land is situated or
                    <br>included
                    <br>(a) In Municipal Area
                    <br>(b) In City Survey Area
                    <br>(c) In or near a cantonment area
                    <br>(d) Near a Air-port or a Rly. Station
                    <br>or a Jail or prison or local public
                    <br>office or cremation or burial ground.
                    <br>(e) Adjoining to nalla, creek, bank
                    <br>of river etc.
                    <br>If so, its approximate distance there
                    <br>from.
                </td>
                <td class="third-column">
                    <?php echo $na_data['situated_land']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">10.</td>
                <td class="second-column">Whether electrical high transmission
                    <br>lines (or path way, road, canal,
                    <br>nalla) pass over/through the land
                    <br>and if so what is the distance
                    <br>thereof from the proposed building
                    <br>or other works.
                </td>
                <td class="third-column">
                    <?php
                    if ($na_data['electrical_distance_land'] == IS_CHECKED_YES) {
                        echo 'YES';
                    } else if ($na_data['electrical_distance_land'] == IS_CHECKED_NO) {
                        echo 'NO';
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">11.</td>
                <td class="second-column">Is the land under acquisitions if so,
                    <br>state details
                </td>
                <td class="third-column">
                    <?php
                    if ($na_data['acquisition_under_land'] == IS_CHECKED_YES) {
                        echo 'YES';
                    } else if ($na_data['acquisition_under_land'] == IS_CHECKED_NO) {
                        echo 'NO';
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">12.</td>
                <td class="second-column">Is there a road from where the land
                    <br>is easily accessible ? State the
                    <br>name of the road and whether it is
                    <br>Highway, Major district road or
                    <br>village road. What is the distance of
                    <br>the proposed building or other work
                    <br>from the centre of the road?
                </td>
                <td class="third-column">
                    <?php
                    if ($na_data['accessible_land'] == IS_CHECKED_YES) {
                        echo 'YES';
                    } else if ($na_data['accessible_land'] == IS_CHECKED_NO) {
                        echo 'NO';
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">13.</td>
                <td class="second-column">If there is no road adjoining the
                    <br>land how is it proposed to provide
                    <br>for access to the site ?
                    <br>(Please refer point No. 2 (b)
                    <br>herebefore)
                </td>
                <td class="third-column">
                    <?php
                    if ($na_data['site_access_land'] == IS_CHECKED_YES) {
                        echo 'YES';
                    } else if ($na_data['site_access_land'] == IS_CHECKED_NO) {
                        echo 'NO';
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">14.</td>
                <td class="second-column">Was a similar application made in
                    <br>the past for non-agricultural use of
                    <br>this land and was it rejected?
                    <br>If yes, Why ?
                </td>
                <td class="third-column">
                    <?php
                    if ($na_data['rejected_land'] == IS_CHECKED_YES) {
                        echo 'YES';
                    } else if ($na_data['rejected_land'] == IS_CHECKED_NO) {
                        echo 'NO';
                    }
                    ?>
                    </td>
            </tr>
        </table>
        <br />
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 50px;word-spacing: 10px;">I solemnly affirm that the information given above is true to the best of my</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;word-spacing: 10px;">knowledge and belief.</div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo NA_DOC_PATH; ?><?php echo $na_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;">Place: <?php echo $na_data['district']; ?> </div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 20px;">Dated : <?php echo convert_to_new_date_format($na_data['submitted_datetime']); ?></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 10px;">Encl.</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 100px;">1 Form No. I & XIV of the land in question, in original + 9 Zerox copy.</div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-left: 100px;">2 Site Plan of the land in question, in original + 9 Zerox copy.</div>
    </body>
</html>-->