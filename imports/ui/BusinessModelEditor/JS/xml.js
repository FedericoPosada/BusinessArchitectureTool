
    var xw = new XMLWriter('UTF-8');
    xw.formatting = 'indented';//add indentation and newlines
    xw.indentChar = ' ';//indent with spaces
    xw.indentation = 2;//add 2 spaces per level
    
    xw.writeStartDocument( );
    xw.writeDocType('"items.dtd"');
    xw.writeStartElement( 'config' );


      xw.writeComment('Initial Processors Configuration');
      xw.writeStartElement('processors');
      xw.writeStartElement('procesor');
        xw.writeAttributeString( 'id', 'P1');
        xw.writeElementString('name','Clients')
        xw.writeElementString('behaviour','behaviour.xml')
        xw.writeElementString('type','leaf')
        xw.writeElementString('groupId','0')
        xw.writeElementString('numInstances','15')
        xw.writeEndElement();
         xw.writeStartElement('procesor');
        xw.writeAttributeString( 'id', 'P2');
        xw.writeElementString('name','Ice Cream Truck')
        xw.writeElementString('behaviour','behaviourICT.xml')
        xw.writeElementString('type','group')
        xw.writeElementString('groupId','0')
        xw.writeElementString('numInstances','1')
        xw.writeEndElement();
         xw.writeStartElement('procesor');
        xw.writeAttributeString( 'id', 'P3');
        xw.writeElementString('name','Suppliers')
        xw.writeElementString('behaviour','behaviourSp.xml')
        xw.writeElementString('type','group')
        xw.writeElementString('groupId','0')
        xw.writeElementString('numInstances','1')
        xw.writeEndElement();
         xw.writeStartElement('procesor');
        xw.writeAttributeString( 'id', 'P4');
        xw.writeElementString('name','Cashier')
        xw.writeElementString('behaviour','behaviours.xml')
        xw.writeElementString('type','leaf')
        xw.writeElementString('groupId','2')
        xw.writeElementString('numInstances','1')
        xw.writeEndElement();
       
       xw.writeComment('Initial Accumulations Configuration');
      xw.writeStartElement('accumulations');
      xw.writeStartElement('accumulation');
        xw.writeAttributeString( 'id', 'A1');
        xw.writeElementString('name','Fridge')
        xw.writeElementString('accumulationType','Value')
        xw.writeElementString('subtypes','(popsicles,0,100);(Ice Creams,0,100)')
        xw.writeElementString('groupId','0')
        xw.writeEndElement();  
     
      
    xw.writeEndElement();
    xw.writeEndDocument();
    
    var xml = xw.flush(); //generate the xml string
    xw.close();//clean the writer
    xw = undefined;//don't let visitors use it, it's closed
    //set the xml
    document.getElementById('parsed-xml').value = xml;
    
