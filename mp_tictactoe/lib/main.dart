import 'package:flutter/material.dart';
import 'package:mp_tictactoe/screens/create_room.dart';
import 'package:mp_tictactoe/screens/join_room.dart';
import 'package:mp_tictactoe/screens/main_menu.dart';
import 'package:mp_tictactoe/utils/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color.fromARGB(204, 7, 7, 40),
      ),
      routes: {MainMenuScreen.routeName: (context) => const MainMenuScreen()
      ,
      JoinRoomScreen.routeName: (context) => const JoinRoomScreen(),
      CreateRoomScreen.routeName: (context) => const CreateRoomScreen()},
      initialRoute: MainMenuScreen.routeName,
    );
  }
}
