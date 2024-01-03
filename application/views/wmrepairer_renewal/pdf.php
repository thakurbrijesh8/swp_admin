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
        <div style="font-size: 14px; text-align: center;">SCHEDULE – II “B”</div>
        <div style="text-align: center;">[See rule 11 (2)]</div>
        <div style="text-align: center;">Form - LR – 2</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">[Application for Renewal License as repairers of Weights & Measures under the Legal Metrology Act, 2009]</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br/>
                The Assistant Controller,<br/>
                Department of Legal Metrology,<br/>
                (Weights & Measures)<br/>
                Daman & Diu<br/>
            </div>
        </div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of the concern seeking the license:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['name_of_repairer']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Complete address of the workshop:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['complete_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Repairer's License Number:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['admin_registration_number']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company:</td>
                <td class="third-column">
                    <?php 
                        if($repairer_renewal_data['proprietor_details']){ ?>
                        <table class="newTable" border="1">
                            <tr>
                                <td>Sr No.</td>
                                <td>Name of Occupier</td>
                                <td>Father's Name</td>
                                <td>Address</td>
                            </tr>
                            <?php
                                $proprietorinfo = json_decode($repairer_renewal_data['proprietor_details'], TRUE);
                                $i=1;
                                foreach ($proprietorinfo as $value) { ?>
                                    <tr>
                                        <td class="new-column"><?php echo $i++; ?></td>
                                        <td class="new-column"><?php echo $value['occupier_name']; ?></td>
                                        <td class="new-column"><?php echo $value['father_name']; ?></td>
                                        <td class="new-column"><?php echo $value['address']; ?></td>
                                    </tr>
                            <?php } ?>
                        </table>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Number and Date of shop/Establishment/Current municipal trade License:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['registration_number']; ?><br/>
                    <?php echo convert_to_new_date_format($repairer_renewal_data['registration_date']); ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6</td>
                <td class="second-column">Professional Tax/It Tax Registration Number etc if any:</td>
                <td class="third-column">
                    <?php 
                        if($repairer_renewal_data['identity_choice'] == 1)
                            echo 'VAT Registration Number'; 
                        else if($repairer_renewal_data['identity_choice'] == 2)
                            echo 'Sales Tax Registration Number'; 
                        else if($repairer_renewal_data['identity_choice'] == 3)
                            echo 'CST Number'; 
                        else if($repairer_renewal_data['identity_choice'] == 4)
                            echo 'Professional Tax Registration Number'; 
                        else if($repairer_renewal_data['identity_choice'] == 5)
                            echo 'IT Number'; 
                    ?><br/>
                    <?php echo $repairer_renewal_data['identity_number']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7</td>
                <td class="second-column">The type of weights and measures proposed to be repaired:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['weights_type']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8</td>
                <td class="second-column">Area in which you wish to operate:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['area_operate']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">13</td>
                <td class="second-column">Have you sufficient stock of lone/test weights, etc ?<br/>Give Details:</td>
                <td class="third-column">
                    <?php echo $repairer_renewal_data['sufficient_stock'] == 1 ? 'YES' : 'NO';; ?><br/>
                    <?php echo $repairer_renewal_data['stock_details']; ?>
                </td>
            </tr>
        </table>
    
    
        <br />
        <table style="margin-left: 20px;">
            <tr>
                <td class="declaration" >To Be Certified by Applicant(s)<br/></td>
            </tr>
            <tr>
                <td class="declaration">(i) Certified that I/We have read the Legal Metrology Act,2009 and the Daman and Diu Legal Metrology (Enforcement) Rules, 2011 and agree to abide by the same and also the same and also the administrative orders and instructions issued or to be issued there under.</td>
            </tr>
            <tr>
                <td class="declaration">(ii) I/We agree to deposit the Scheduled license fees with Government as soon as required to do so by the Licensing Authority.</td>
            </tr>
            <tr>
                <td class="declaration">(iii) All the information furnished above is true to the best of my/our knowledge.</td>
            </tr>
        </table>
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo REPAIRER_DOC_PATH; ?><?php echo $repairer_renewal_data['signature']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Signature</td></tr>
        </table>
    
</body>
</html>