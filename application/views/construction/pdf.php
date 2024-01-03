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
        <div style="font-size: 14px; text-align: center;">Annexure - 2</div>
        <div style="font-size: 14px; text-align: center;">Form of Construction Permission</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br/>
                The Competent Authority,<br>
                UT Administration of Daman and Diu,<br>
                Daman.<br/>
            </div>
        </div>
       <div style="font-size: 14px;margin-top: 20px;">Sir,</div><br/>
        <div style="font-size: 14px;margin-top: 5px;line-height: 1.6;">I hereby give notice that I intend to  carry out development/to erect, re-erect, re-erect or to make alteration in the building No.  <b><?php echo $construction_data['building_no']; ?></b> or on Plot. No/Revenue No./CTS No. <b> <?php echo $construction_data['plot_no']; ?></b> Situated in Road/Street  of Town/Village  <b><?php echo $construction_data['village']; ?></b> in accordance with the Development Control Rules 2005 of Daman, I forward herewith all the documents as per the checklist required along with the following plans and specifications in two copies duly singed by me and Shri  <b><?php echo $construction_data['name']; ?></b> Architect / Engineer / Structural Engineer License No. <b><?php echo $construction_data['license_no']; ?></b>  who has prepared the Plans/Designs and a copy of other statement and Documents as applicable with the Development Control Rules, 2005 of Daman District.</div>



        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">1.Owneship Title<br/>
        2.Location plan<br/>
        3.Site Plan<br/>
        4.Sub-division/layoutplan<br/>
        5.Bulding plan<br/>
        6.Specifications general and detailed
</div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">I request that the constructing may be approved and permission accorded to me to execute the work. </div>

         <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Date : <b><?php echo date('d/m/Y',strtotime($construction_data['created_time'])); ?></b>
        </div>


        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">          
        Signature of the Owner

        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            <img src="<?php echo base_url(); ?>documents/construction/<?php echo  $construction_data['signature']; ?>" height="100px" width="100px">
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Name of Owner : <b><?php echo $construction_data['name_of_owner']; ?></b>
        </div>
        
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Address : <b><?php echo $construction_data['address_of_owner']; ?></b>
        </div>
       
        <br />
    
</body>
</html>