<html>
    <head>
        <title>Annexure-11</title>
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
        <!-- <div style="font-size: 14px; text-align: center;">UT Administration of,</div>
        <div style="font-size: 14px; text-align: center;">Dadra & Nagar Haveli and Daman & Diu</div>
        <div style="font-size: 14px; text-align: center;">Department of Town and Country Planning Department,</div>
        <div style="font-size: 14px; text-align: center;"></div>        
        <div style="font-size: 14px; text-align: center;">dic-dnh@nic.in 0260-2642367/2643122</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application format Permission For Buyer of Lease rights of Government Industrial plots</div> -->
        <div style="font-size: 14px; text-align: center;">UT Administration of</div>
        <div style="font-size: 14px; text-align: center;">Dadra & Nagar Haveli and Daman & Diu</div>
        <div style="font-size: 14px; text-align: center;">Department of Town and Country Planning Department</div>
        <div style="font-size: 14px; text-align: center;">&emsp;</br></div>
        <div style="font-size: 14px; text-align: center;">Annexure -11</div>
        <div style="font-size: 14px; text-align: center;">Form for informing completion of work up to Plinth Level</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The Competant Authority,<br>
                UT Administration of,<br>
                DNH&DD<br>
                Daman,
            </div>
            <div>&emsp;</div>
            <div class="form-group col-sm-6">
               Sir/Madam,
            </div>
        </div>
        <div style="font-size: 14px; text-align: left; margin-top: 20px;margin-left: 90px;word-spacing: 4px;">I here inform that the construction up to plinth/column up to plinth level has</div>
        <div style="font-size: 14px; text-align: left; margin-left: 50px; word-spacing: 4px;">been completed for the Building <?php echo $inspection_data['plinth_column']; ?> on/in Plot NO. <?php echo $inspection_data['plot_no']; ?> in <?php echo $inspection_data['zone']; ?> Zone situated at <?php echo $inspection_data['road']; ?> Road /Street <?php echo $inspection_data['street']; ?> of <?php echo $inspection_data['industrial_area']; ?> Industrial Area as your permission vide office Communicatin No <?php echo $inspection_data['communication_number']; ?> dated <?php echo $inspection_data['dated']; ?> under my supervision and in accordance with the sanctioned plan.</div>
        
        <div style="font-size: 14px; text-align: left; margin-top: 20px;margin-left: 50px;word-spacing: 4px;"> The completed work may be checked and permission be given to proceed with further work.
        </div>
        <br/>
        <table class="CompanyDetails" style="border: none;">
            <tr>
                <td class="first-column">Name of the Licensed</td>
                <td class="second-column"><?php echo $inspection_data['name_licensed']; ?></td>
                <td class="third-column">
                    <img src="<?php echo base_url(); ?>documents/inspection/<?php echo $inspection_data['signature_architecture']; ?>" height="30px" width="100px">
                </td>
            </tr>
            <tr>
                <td class="first-column">Registration No </td>
                <td class="second-column"><?php echo $inspection_data['registration_no']; ?></td>
                <td class="third-column">                    
                </td>
            </tr>
            <tr>
                <td class="first-column">Valid upto </td>
                <td class="second-column"><?php echo $inspection_data['valid_upto_date']; ?></td>
                <td class="third-column">                    
                </td>
            </tr>
            <tr>
                <td class="first-column">Address </td>
                <td class="second-column"><?php echo $inspection_data['address']; ?></td>
                <td class="third-column">                    
                </td>
            </tr>
            <tr>
                <td class="first-column">Date: </td>
                <td class="second-column"><?php echo $inspection_data['application_date']; ?></td>
                <td class="third-column">                    
                </td>
            </tr>   
           
        </table>
    
    
        <br />
       
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo base_url(); ?>documents/inspection/<?php echo $inspection_data['sign_seal']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none" style=" text-align: center;"><?php echo $inspection_data['name_of_applicant']; ?></td></tr>
            <tr><td class="border-none">(Name of Owner)</td></tr>
        </table>
    
</body>
</html>