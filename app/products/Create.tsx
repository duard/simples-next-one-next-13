'use client';

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Item</h1>
//     </div>
//   );
// }

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateItem() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const create = async() => {
    // const db = new PocketBase('http://127.0.0.1:8090');

    // await db.records.create('items', {
    //   title,
    //   content,
    // });
    console.log(`criando produto`, JSON.stringify({
      title,
      content,
    }));

    await fetch('http://127.0.0.1:8090/api/collections/products/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setContent('');
    setTitle('');

    router.refresh();
  }

  return (
    <form onSubmit={create}>
      <h3>Create a new Item</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        Create item
      </button>
    </form>
  );
}
