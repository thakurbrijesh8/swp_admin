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
        <div style="font-size: 14px; text-align: center;">Weight and Measure Form</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application format for Manufacturer/Packer/Importer, <br>Registration as per Rule Standard of Weight and Measures (P.C) <br> Rule,2011 U/s. 27</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To<br>
                The Assistant Controller,<br>
                Department of Legal Metrology,<br>
                (Weights & Measures)<br>
                Daman & Diu,
            </div>
        </div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of Applicant:</td>
                <td class="third-column">
                    <?php echo $periodicalreturn_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Complete Address of Registered Office:</td>
                <td class="third-column">
                    <?php echo $periodicalreturn_data['location_of_factory']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Complete Address of Manufacturing/Packing/Importing Premises:</td>
                <td class="third-column">
                    <?php echo $periodicalreturn_data['branches']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Item to be Manufactured/Packed/Imported:</td>
                <td class="third-column">
                    <?php echo $periodicalreturn_data['application_category']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Name and Address Along with their father's / husband's name of proprietor and/or Patners and Managing Director's in the case of limited company:</td>
                <td class="third-column">
                    <?php 
                        if($periodicalreturn_data['proprietor_details']){ ?>
                        <table class="newTable" border="1">
                            <tr>
                                <td>Sr No.</td>
                                <td>Name of Occupier</td>
                                <td>Father's Name</td>
                                <td>Address</td>
                            </tr>
                            <?php
                                $proprietorinfo = json_decode($periodicalreturn_data['proprietor_details'], TRUE);
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
            
        </table>
    
    
        <br />
        <table style="margin-left: 20px;">
            <tr>
                <td class="declaration" >Declaration<br/></td>
            </tr>
            <tr>
                <td class="declaration">(i) I/We of the Applicant/Authorized Person have read The Legal Metrology Act, 2009 and The Legal Metrology(Packaged Commodities) Rules,2011 and agree to abide by the same and also declare that the packages package manufactured /prepack/imported will complied the various provisions of the Legal Metrology ( Package Commodity ) Rules 2011.</td>
            </tr>
            <tr>
                <td class="declaration">(ii) I/we also state that the contents given in the application are true and correct to the best of my/our knowledge.</td>
            </tr>
            <tr>
                <td class="declaration">(iii) Fees of Rs. 500/- for registration of manufacturer/packer/importer of prepackaged commodities is enclosed.</td>
            </tr>
        </table>
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo WMREG_DOC_PATH; ?><?php echo $periodicalreturn_data['signature']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Signature</td></tr>
        </table>
    
</body>
</html>