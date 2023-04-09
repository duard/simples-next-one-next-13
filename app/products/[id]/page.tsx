import styles from '../itens.module.css';

async function getItem(itemId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/products/records/${itemId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function ItemPage({ params }: any) {
  const item = await getItem(params.id);

  return (
    <div>
      <h1>items/{item.id}</h1>
      <div className={styles.item}>
        <h3>{item.title}</h3>
        <h5>{item.content}</h5>
        <p>{item.created}</p>
      </div>
    </div>
  );
}
