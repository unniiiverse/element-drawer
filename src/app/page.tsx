'use client';

import { FormEvent, useState } from 'react';



const ElementDrawerTypes = ['SELECT', 'TEXT_INPUT'] as const;
type ElementDrawerType = typeof ElementDrawerTypes[number]



interface IElementDrawer {
  row: number
  col: number
  label: string
  type: ElementDrawerType
  opts: string | string[]
}



function parseValue(str: string): IElementDrawer {
  const args = str.split(';');

  const row = Number(args[0].trim());
  const col = Number(args[1].trim());
  const label = args[2].trim();
  const type = args[3].trim() as ElementDrawerType;
  const opts = args[4];
  let selectOpts: string[] = [];



  // Validate type
  if (!ElementDrawerTypes.includes(type)) throw new Error('Invalid type');

  // Parse select opts
  if (type === 'SELECT') selectOpts = opts.split(',').map(el => el.trim());



  return { col, label, opts: type === 'SELECT' ? selectOpts : opts, row, type };
}



export default function Page() {
  const [value, setValue] = useState('1;1;label;TEXT_INPUT;placeholder');
  const [drawers, setDrawers] = useState<IElementDrawer[]>([]);



  function submitForm(e: FormEvent) {
    e.preventDefault();

    try {
      const drawer = parseValue(value);
      if (drawers.some(el => el.col === drawer.col && el.row === drawer.row)) throw new Error(`Element at ${drawer.col}:${drawer.row} already exist`);

      setDrawers(prev => [...prev, drawer]);
    } catch (e) {
      alert(e);
    } finally {
      setValue('');
    }
  }



  return <main className="p-8 flex flex-col gap-8">
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">element drawer</h1>
      <h3>Enter string with following format: rowNumber;columnNumber;inputLabel;inputType;inputOptions</h3>
      <h3>Eg: <code className="bg-gray-100">1;1;label;TEXT_INPUT;placeholder</code></h3>
    </div>

    <form action="none" className="flex gap-2" onSubmit={submitForm}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} className="w-[500px] bg-gray-100" placeholder="Enter value" />
      <button type="submit" className="cursor-pointer">submit</button>
    </form>

    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {drawers.map((drawer, i) => {
        return <div className={`flex bg-amber-100`} key={`drawer--${i}`} style={{ gridRow: drawer.row, gridColumn: drawer.col }}>
          {drawer.type === 'TEXT_INPUT' && <>
            <input name={`drawer-input--${drawer.col}:${drawer.row}`} type="text" placeholder={drawer.opts as string} className="bg-gray-100" />
          </>}

          {drawer.type === 'SELECT' && <>
            <select name={`drawer-select--${drawer.col}:${drawer.row}`} className="bg-gray-100!">
              {(drawer.opts as string[]).map((opt, optI) => {
                return <option value={opt} key={`drawer--${i}-option--${optI}`}>{opt}</option>;
              })}
            </select>
          </>}
        </div>;
      })}
    </div>
  </main>;
}