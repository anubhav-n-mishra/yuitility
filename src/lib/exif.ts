/** Bounded JPEG APP1/TIFF reader. Only displayed, supported tags are claimed. */
export function readJpegExif(buffer: ArrayBuffer): Record<string, string> {
  const view = new DataView(buffer), tags: Record<string,string> = {};
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) throw new Error('EXIF inspection currently supports JPEG files only.');
  let pos = 2;
  while (pos + 4 <= view.byteLength) {
    if (view.getUint8(pos) !== 0xff) break;
    const marker = view.getUint8(pos+1); if (marker === 0xda || marker === 0xd9) break;
    const length = view.getUint16(pos+2), end = pos+2+length;
    if (length < 2 || end > view.byteLength) throw new Error('Malformed JPEG segment.');
    const start=pos+4;
    if(marker===0xe1 && start+6<=end && view.getUint32(start)===0x45786966 && view.getUint16(start+4)===0){
      const base=start+6;
      const within=(offset:number,size:number)=> {if(offset<base || offset+size>end)throw new Error('Malformed EXIF offset.');};
      within(base,8);
      const endian=view.getUint16(base);if(endian!==0x4949&&endian!==0x4d4d)throw new Error('Invalid TIFF byte order.');
      const little=endian===0x4949;
      const u16=(o:number)=>{within(o,2);return view.getUint16(o,little);};
      const u32=(o:number)=>{within(o,4);return view.getUint32(o,little);};
      if(u16(base+2)!==42)throw new Error('Invalid TIFF header.');
      const visited=new Set<number>();
      const parse=(relative:number,gps=false,depth=0)=>{
        if(depth>2||visited.has(relative))return;visited.add(relative);
        const offset=base+relative,count=u16(offset);if(count>512)throw new Error('Too many EXIF entries.');
        within(offset+2,count*12);
        for(let i=0;i<count;i++){
          const entry=offset+2+i*12,tag=u16(entry),type=u16(entry+2),n=u32(entry+4);
          const sizes:Record<number,number>={1:1,2:1,3:2,4:4,5:8,7:1};
          const size=sizes[type];if(!size||n>65536)continue;
          const at=n*size<=4?entry+8:base+u32(entry+8);within(at,n*size);
          if(tag===0x8769||tag===0x8825){parse(u32(entry+8),tag===0x8825,depth+1);continue;}
          const names:Record<number,string>=gps?{1:'GPS latitude reference',2:'GPS latitude (degrees/minutes/seconds)',3:'GPS longitude reference',4:'GPS longitude (degrees/minutes/seconds)'}:{0x010f:'Camera make',0x0110:'Camera model',0x0112:'Orientation',0x0132:'Date/time (camera)',0x829a:'Exposure time',0x829d:'F-number',0x8827:'ISO',0x9003:'Original date/time',0x920a:'Focal length',0xa002:'Pixel width',0xa003:'Pixel height'};
          const name=names[tag];if(!name)continue;
          let result='';
          if(type===2)result=new TextDecoder().decode(new Uint8Array(buffer,at,n)).replace(/\0.*$/s,'');
          else if(type===3)result=String(u16(at));
          else if(type===4)result=String(u32(at));
          else if(type===5)result=Array.from({length:Math.min(n,3)},(_,j)=>{const d=u32(at+j*8+4);return d?String(u32(at+j*8)/d):'undefined';}).join(', ');
          if(result)tags[name]=result;
        }
      };
      parse(u32(base+4));return tags;
    }
    pos=end;
  }
  return tags;
}
