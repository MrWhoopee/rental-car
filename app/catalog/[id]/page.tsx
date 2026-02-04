export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1>Car Details: {id}</h1>
      <p>Details implementation coming soon.</p>
    </div>
  );
}
