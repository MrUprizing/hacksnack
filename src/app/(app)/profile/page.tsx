"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

type Session = {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null; // Modificado aquí para aceptar null
  };
} | null;

const UserAvatar = ({ session }: { session: Session }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="mb-2">Avatar</CardTitle>
          <CardDescription>
            This is your avatar.
            <br />
            Click on the avatar to upload a custom one from your files.
          </CardDescription>
        </div>
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={
              session?.user.image ||
              `https://avatar.vercel.sh/${session?.user.name}.svg`
            }
            alt="User avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </CardHeader>
    <Separator />
    <CardFooter>
      <p className="text-sm text-muted-foreground">
        An avatar is optional but strongly recommended.
      </p>
    </CardFooter>
  </Card>
);

const DisplayName = ({ session }: { session: Session }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="mb-2">Nombre de usuario</CardTitle>
          <CardDescription>
            Please enter your full name, or a display name you are comfortable
            with.
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Input
        placeholder="Tu nombre de usuario"
        defaultValue={session?.user?.name}
      />
    </CardContent>
    <Separator />
    <CardFooter className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        Please use 32 characters at maximum.
      </p>
      <Button size="sm">Save</Button>
    </CardFooter>
  </Card>
);

// HeightCard component
const HeightCard = ({ height }: { height?: number }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="mb-2">Altura</CardTitle>
          <CardDescription>Ingresa tu altura en centímetros.</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Input
        type="number"
        placeholder="Tu altura (cm)"
        defaultValue={height ?? ""}
        min={50}
        max={300}
      />
    </CardContent>
    <Separator />
    <CardFooter className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        Por favor, usa valores entre 50 y 300 cm.
      </p>
      <Button size="sm">Guardar</Button>
    </CardFooter>
  </Card>
);

// WeightCard component
const WeightCard = ({ weight }: { weight?: number }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="mb-2">Peso</CardTitle>
          <CardDescription>Ingresa tu peso en kilogramos.</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Input
        type="number"
        placeholder="Tu peso (kg)"
        defaultValue={weight ?? ""}
        min={20}
        max={400}
      />
    </CardContent>
    <Separator />
    <CardFooter className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        Por favor, usa valores entre 20 y 400 kg.
      </p>
      <Button size="sm">Guardar</Button>
    </CardFooter>
  </Card>
);

export default function UserInfo() {
  const { data: session, error } = authClient.useSession();
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="space-y-6 p-4 md:p-8 lg:p-12">
      <h2 className="pb-4 pt-2 text-xl sm:text-xl md:text-3xl lg:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 dark:from-neutral-100 to-neutral-400 dark:to-neutral-500 inset-x-0">
        Profile
      </h2>
      <Separator className="mb-6" />
      <UserAvatar session={session} />
      <DisplayName session={session} />
      <HeightCard height={160} />
      <WeightCard weight={60} />
    </section>
  );
}
