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
        <div style="font-size: 14px; text-align: center;">FORM 2</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Prescribed under rules 6 and 15</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application for registration and notice of occupation</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Specified in section 6 and 7</div>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">(a) Full name of factory:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['name_of_factory']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(b) Factory Licence number if already registered before:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['factory_license_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">(a) Full factory address to situation of factory:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['factory_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(b) Full postal address to which communications Relating to factory should be sent:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['factory_postal_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Nature of manufacturing process or processes</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name and values of principle products manufactured during the last twelve months (in the case of factories already in existence):</td>
                <td class="third-column">
                    <?php
                        if($factorylicense_data['product_data']){?>
                            <table class="newTable" border="1">
                                <tr>
                                    <td>Sr No.</td>
                                    <td>Name</td>
                                    <td>Values</td>
                                </tr>
                                <?php
                                    $productinfo = json_decode($factorylicense_data['product_data'], TRUE);
                                    $i=1;
                                    foreach ($productinfo as $value) { ?>
                                        <tr>
                                            <td class="new-column"><?php echo $i++; ?></td>
                                            <td class="new-column"><?php echo $value['product_name']; ?></td>
                                            <td class="new-column"><?php echo $value['product_value']; ?></td>
                                        </tr>
                                <?php } ?>
                            </table>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(a) Carried on in the factory in the last twelve months (in the case of factories already existence) :</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['nature_of_work']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(b) to be carried on in the factory during the next twelve months (in the case of all factories) :</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['work_carried']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">(a) Maximum number of workers proposed to be employed on any one day during the year:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['max_no_of_worker_year']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(b) Maximum number of workers employed on any one day during the last twelve months (in the case of factories already in existence):</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['max_no_of_worker_month']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(c) Number of worker to be ordinarily employed in the factory:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['no_of_ordinarily_emp']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">(a) Nature and total amount of power (H.P.):</td>
                <td class="third-column"></td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(i) Installed:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['total_power_install']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(ii) Proposed to be installed:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['total_power_used']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">7 </td>
                <td class="second-column">Full name and residential address of the person who shall be the manager of the factory for the purpose of the Act:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['manager_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">8 </td>
                <td class="second-column">Full name and residential address of the Occupier:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['occupier_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(a) The proprietor of the factory in case of a private firm or Proprietary concern:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['proprietor_of_factory']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(b) The directors in case of a public limited liability company or firm:</td>
                <td class="third-column">
                    <table class="newTable" border="1">
                        <tr>
                            <td>Sr No.</td>
                            <td>Director Name</td>
                        </tr>
                        <?php
                            $directorinfo = json_decode($factorylicense_data['director_info'], TRUE);
                            $i=1;
                            foreach ($directorinfo as $value) { ?>
                                <tr>
                                    <td class="new-column"><?php echo $i++; ?></td>
                                    <td class="new-column"><?php echo $value['director_name']; ?></td>
                                </tr>
                        <?php } ?>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(C)<br/>
                (i) the managing agent in case where a managing agent is employed<br/>
                (ii) the directors of the above managing agent:</td>
                <td class="third-column">
                    <table class="newTable" border="1">
                        <tr>
                            <td>Sr No.</td>
                            <td>Managing Agent</td>
                            <td>Director Of Managing Agent</td>
                        </tr>
                        <?php
                            $managingdirectorinfo = json_decode($factorylicense_data['managing_director_info'], TRUE);
                            $i=1;
                            foreach ($managingdirectorinfo as $value) { ?>
                                <tr>
                                    <td class="new-column"><?php echo $i++; ?></td>
                                    <td class="new-column"><?php echo $value['manager_name']; ?></td>
                                    <td class="new-column"><?php echo $value['managing_director_name']; ?></td>
                                </tr>
                        <?php } ?>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(d) The share holders in case of a private company where no managing agent is employed:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['share_holders']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(e) The chief administrative head in case of Government or factory run by a local authority or by any statutory corporation or body:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['chief_head']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">9 </td>
                <td class="second-column">Full name and address of the owner of the premises or building (including the prints therefore) referred to in section 93:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['owner_detail']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">10 </td>
                <td class="second-column">In the case of a factory constructed or extended after the commencement of these rules:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['is_factory_extend']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column"> </td>
                <td class="second-column">(a) Reference number and date of approval of the arrangements, if any, made for the disposal of trade waste and affluent and the name of the authority granting such approval:</td>
                <td class="third-column">
                    <?php echo $factorylicense_data['reference_no']; ?><br/>
                    <?php echo $factorylicense_data['date_of_approval']; ?><br/>
                    <?php echo $factorylicense_data['disposal_waste']; ?><br/>
                    <?php echo $factorylicense_data['name_of_authority']; ?>
                </td>
            </tr>
        </table>
    <br />
    <table style="margin-left: 475px;">
        <tr><td class="border-none"><img src="<?php echo FACTORY_DOC_PATH; ?><?php echo $factorylicense_data['sign_of_occupier']; ?>" height="100px" width="100px"></td></tr>
    </table>
    <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
        <tr><td class="border-none">Signature of Occupier</td></tr>
    </table>
   <!--  <hr> -->
    <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">Notes :-</div>
    <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">1. If power is not used at the time of filling up this form, but is introduced later, the fact should be communicated to the Chief Inspector of Factories immediately.</div>
    <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">2. If any of the persons named against item 8 is minor, the fact should be clearly stated.</div>
    <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">3. In the case of a factory where under the provise to sub-section (1) and (2) of section 100, a person has been nominated as the occupier, information required in item 8 should be supplied only in respect of that person.</div>
    <div style="text-align: left;margin-top: 15px;word-spacing: 2px;">4. In the case of a factory where a managing agent or agents have been appointed as occupier under the Indian Compaines Act, 1956, information required in item 8 should be supplied only in respect of that person or persons.</div>
</body>
</html>