// import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './itens.module.css';
import CreateItem from './Create';


// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'


async function getItems() {
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('items');
  const res = await fetch('http://127.0.0.1:8090/api/collections/products/records?page=1&perPage=30', { cache: 'no-store' });

  const data = await res.json();
  console.log(`Dados Fetch`, data);
  return data?.items as any[];
}

export default async function ItemsPage() {
  const items = await getItems();

  return(
    <div>
      <h1>Items</h1>
      <div className={styles.grid}>
        {items?.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>

      <CreateItem />
    </div>
  );
}

function Item({ item }: any) {
  const { id, title, content, created } = item || {};

  return (
    <Link href={`/products/${id}`}>
      <div className={styles.item}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
