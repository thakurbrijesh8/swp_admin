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
        <div style="font-size: 14px; text-align: center;">Allotment of Plot</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application for Allotment of Plot for Industrial Purpose in Government Industrial Estates.</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                 The General Manager,<br>
                 District Industries Centre,<br>
                 DNH&DD,<br>
                 Silvassa.
            </div>
        </div>
        <br/>
         <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of Applicant:</td>
                <td class="third-column">
                    <?php echo $landallotment_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Applicant Address:</td>
                <td class="third-column">
                    <?php echo $landallotment_data['applicant_address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Government Industrial Estate:</td>
                <td class="third-column">
                    <?php echo $landallotment_data['village_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Plot No:</td>
                <td class="third-column">
                    <?php echo $landallotment_data['plot_no']; ?>
                </td>
            </tr>
             <tr>
                <td class="first-column">5 </td>
                <td class="second-column">Admeasuring in square metre:</td>
                <td class="third-column">
                    <?php echo $landallotment_data['govt_industrial_estate_area']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">6 </td>
                <td class="second-column">Name and full address of the applicant i.e. Proprietor, Partners or Directors:</td>
                <td class="third-column">
                    <?php 
                        if($landallotment_data['proprietor_details']){ ?>
                        <table class="newTable" border="1">
                            <tr>
                                <td>Sr No.</td>
                                <td>Name of Applicant</td>
                                <td>Address</td>
                                <td>Applicant Type</td>
                            </tr>
                            <?php
                                $proprietorinfo = json_decode($landallotment_data['proprietor_details'], TRUE);
                                $i=1;
                                foreach ($proprietorinfo as $value) { ?>
                                    <tr>
                                        <td class="new-column"><?php echo $i++; ?></td>
                                        <td class="new-column"><?php echo $value['name']; ?></td>
                                        <td class="new-column"><?php echo $value['address']; ?></td>
                                        <td class="new-column"><?php echo $value['applicant_type']; ?></td>
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
                <td class="declaration">I/We hereby give an undertaking that I/We will abide by the terms and conditions laid down by the Administration of Dadra and Nagar Haveli from time to time.</td>
            </tr>
        </table>
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo LANDALLOTMENT_DOC_PATH; ?><?php echo $landallotment_data['signature']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Signature</td></tr>
        </table>
    
</body>
</html>