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
        <div style="font-size: 14px; text-align: center;">Annexure - 13</div>
        <div style="font-size: 14px; text-align: center;">Form of Completion Certificate</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br/>
                Competent Authority,<br/>
                Daman<br/>
            </div>
        </div>
        <div style="font-size: 14px;margin-top: 20px;">Sir</div>
        <div style="font-size: 14px;margin-top: 5px;line-height: 1.6;">I hereby certify that the erection/re-erection of development work of building part building in plot No. <b><?php echo $occupancycertificate_data['plot_no']; ?></b> of <b><?php echo $occupancycertificate_data['zone']; ?></b> Zone situated at <b><?php echo $occupancycertificate_data['situated_at']; ?></b> has been supervised by me and has been completed on <b><?php echo $occupancycertificate_data['competion_date']; ?></b> according to the Plan sanctioned vide office Order No dated</div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">The work has been completed to my best satisfaction. The workmanship and all materials (type and grade) have been used strictly in accordance with general and detailed specifications as specified in the DC Rules 2005 of Daman District No provisions of the Act or the Building Bye-laws, no requisitions made, conditions prescribed or orders issued thereunder have been transgressed in the course of the work. I am enclosing three copies of the completion plans, one of which is cloth mounted. The building is now fit for occupancy, for which it has been erected/re-erected or altered, constructed and enlarged.</div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">I have to request you to arrange for the inspection and give permission for occupation of the said building. </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Name of the Licensed Architect/Engineer Structural Engineer/Surveyor : <b><?php echo $occupancycertificate_data['licensed_engineer_name']; ?></b>
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            <img src="<?php echo OCCUPANCY_DOC_PATH; ?><?php echo  $occupancycertificate_data['licensed_engineer_signature']; ?>" height="100px" width="100px">
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Name of Owner : <b><?php echo $occupancycertificate_data['owner_name']; ?></b>
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            <img src="<?php echo OCCUPANCY_DOC_PATH; ?><?php echo  $occupancycertificate_data['owner_signature']; ?>" height="100px" width="100px">
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Signature of Owner 
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Registration No : <b><?php echo $occupancycertificate_data['occupancy_registration_no']; ?></b>
        </div>
         <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Valid upto : <b><?php echo date('d/m/Y',strtotime($occupancycertificate_data['occupancy_valid_upto'])); ?></b>
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Address : <b><?php echo $occupancycertificate_data['address']; ?></b>
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            Date : <b><?php echo date('d/m/Y',strtotime($occupancycertificate_data['created_time'])); ?></b>
        </div>
        <br />
    
</body>
</html>