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
        <div style="font-size: 14px; text-align: center;">Film Shooting Permission (s) Form</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Production House/Company/Producer:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['production_house']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Permanent Address:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column"> Production Manager (Line Producer In U.T. of Dadra and Nagar Haveli & Daman and Diu):</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['production_manager']; ?><br/>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Contact No's/Facsimile:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['contact_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">E-Mail:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['email']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6</td>
                <td class="second-column">Director/Cast:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['director_cast']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7</td>
                <td class="second-column">Film Title:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['film_title']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8</td>
                <td class="second-column">Film Synopsis Mandatory (In 100 Words):</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['film_synopsis']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">9</td>
                <td class="second-column">Number Of Film Shooting Days In Goa:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['film_shooting_days']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">10</td>
                <td class="second-column">Film Shooting Locations</td>
                <td class="third-column"><br/>
                    <?php echo $filmshooting_data['shooting_location']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">11</td>
                <td class="second-column">Film Shooting date (s) & timings:</td>
                <td class="third-column">
                    <?php echo convert_to_new_date_format($filmshooting_data['shooting_date_time']); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">12</td>
                <td class="second-column">If Any Defense Installations Are Involved:</td>
                <td class="third-column">
                    <?php echo $filmshooting_data['defense_installation']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">13</td>
                <td class="second-column">Negative Portrayal Of The U.T. of Dadra and Nagar Haveli & Daman and Diu in Any Manner Is Not Permitted And Will Not Be Allowed. Therefore The Producer/ Production Company May Submit A Declaration To This Effect:</td>
                <td class="third-column">
                    <a href ="<?php echo FILMSHOOTING_DOC_PATH; ?><?php echo $filmshooting_data['declaration']; ?>" target="_blank"> View Document </a>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">14</td>
                <td class="second-column">Signed By The Producer (Of The Film):</td>
                <td class="third-column">
                    <img src="<?php echo FILMSHOOTING_DOC_PATH; ?><?php echo $filmshooting_data['producer_signature']; ?>" height="100px" width="100px">
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">15</td>
                <td class="second-column">Signature Of Authorized Representative:</td>
                <td class="third-column">
                    <img src="<?php echo FILMSHOOTING_DOC_PATH; ?><?php echo $filmshooting_data['authorized_representative_sign']; ?>" height="100px" width="100px">
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">16</td>
                <td class="second-column">Seal Of Company:</td>
                <td class="third-column">
                    <img src="<?php echo FILMSHOOTING_DOC_PATH; ?><?php echo $filmshooting_data['seal_of_company']; ?>" height="100px" width="100px">
                </td>
            </tr>
        </table>
        <br />
        <div style="font-size: 14px; text-align: center;font-weight:  bold;margin-top: 20px;">UNDERTAKING / DECLARAUON</div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;margin-top: 10px;line-height: 1.6;">I the undersigned <b><?php echo $filmshooting_data['undersigned']; ?> aged <?php echo $filmshooting_data['aged']; ?></b> years resident of <b><?php echo $filmshooting_data['resident']; ?></b>, District Daman do hereby declare that tho lnformation stated herein is truo to the best of my knowlodgo and belief and nothing has been concealod therein. I am woll aware of the tact that if the information given by me ls proved falselnot true, I will have to face the punishment or fine as per the taw and that the benefits availed by me shall be summarily withdrawn.That, I have applied to the District Magistrate, Daman to issue me permission for (Purpose ) <b><?php echo $filmshooting_data['purpose']; ?> </b>in respect of myself.</div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;line-height: 1.6;">That l' have submitted an application and conditions on it is true and correct to the best of my lknowledge. </div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;line-height: 1.6;">I will he re$ponsible for occurance of any untowards incidents during the said permis$lon period.</div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;line-height: 1.6;">And, in case of any lssue or probabtlity of lssue/event leading to Law and Order problem, I will immediately inform to the Police and Authority concerned.</div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;line-height: 1.6;">I also ta6e responsibility to make sure that noiselvolume during event/function will not exceed the limit fixed by the rule and authority. </div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;line-height: 1.6;">I also undertake the responsibility to make sure that all tire'flghting arrangement, parking facility and security during the evenU{unction are ln place and functional. </div>
        <br/>
        <div style="font-size: 14px; text-align: left; margin-bottom: 5px;line-height: 1.6;">It is undertaking that I have read and understood .the provisron of Section 199 and 200 of the lndian Penal Code. </div>
        <br/>
        <div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Date :  <?php echo date("d/m/Y"); ?></div>
        <div style="font-size: 14px;text-align: left;margin-top: 5px;word-spacing: 5px;">Place : Daman</div>
        <br/><br/>
        <table>
            <tr>
                <td class="border-none">Witness-1 Name : <?php echo  $filmshooting_data['witness_one_name']; ?></td>
            </tr>
        </table>
        <table>
            <tr>
                <td class="border-none"><img src="<?php echo FILMSHOOTING_DOC_PATH; ?><?php echo  $filmshooting_data['witness_one_sign']; ?>" height="60px" width="90px"></td>
            </tr>
        </table>
        <table style="margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Witness-1 Signature</td></tr>
        </table>
        <br/>
        <table>
            <tr>
                <td class="border-none">Witness-2 Name : <?php echo  $filmshooting_data['witness_two_name']; ?></td>
            </tr>
        </table>
        <table>
            <tr>
                <td class="border-none"><img src="<?php echo FILMSHOOTING_DOC_PATH; ?><?php echo  $filmshooting_data['witness_two_sign']; ?>" height="60px" width="90px"></td>
            </tr>
        </table>
        <table style="margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Witness-2 Signature</td></tr>
        </table>
</body>
</html>