'use client';

import { FormEvent } from 'react';
import UploadFile from '../ui/components/file-upload';
import Counter from '../ui/components/counter';
import PaginatedTable from '../ui/components/pagination';

type ChildProps = {
  parentCallBackfn: (childData: string) => void;
};

export default function AboutPage() {
  const handleCallBack = (childData: string) => {
    console.log(childData);
  };

  return (
    <div className="flex flex-col">
      <h3>Play ground</h3>
      <div className="flex flex-col my-4">
        <Child parentCallBackfn={handleCallBack} />
      </div>
      <div className="flex flex-col">
        <UploadFile />
        <Counter />
        <PaginatedTable />
      </div>
    </div>
  );
}

function Child({ parentCallBackfn }: ChildProps) {
  const onTrigger = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    parentCallBackfn(formData.get('name')?.toString() ?? '');
  };

  return (
    <form onSubmit={onTrigger}>
      <input
        name="name"
        type="text"
        defaultValue=""
        placeholder="Enter name"
        className="border border-gray-300 p-2 mx-2"
      />
      <button type="submit" className="bg-primary">
        Submit
      </button>
    </form>
  );
}
