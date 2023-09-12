import { Aside } from "./components/internals/Aside";
import { Header } from "./components/internals/Header";
import { View } from "./components/internals/View";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 flex gap-6">
        <Aside />
        <View />
      </main>
    </div>
  );
}
