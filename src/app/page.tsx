import { Button, Checkbox, Input, Label } from "./components/ui";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Input type="email" name="email" id="email" placeholder="Enter your email" />
      <Checkbox id="test" />
      <Label htmlFor="test">Remember for 30 days</Label>
      <Button type="submit" variant="default">
        Sign in
      </Button>
    </>
  );
}
